import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signupRedirects } from "../../config/workspaceNav";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import api from "../../services/api"
import toast, { Toaster } from 'react-hot-toast';

const ACCOUNT_SETUP_CONFIG = {
  "individual-client": {
    heading: "Get Started with Trillium.",
    subheading: "Some additional information is required.",
    buttonText: "Finish Setting Up Account",
    fields: [
      {
        name: "fullName",
        label: "Full Name*",
        placeholder: "Jane Smith",
        type: "text",
      },
      {
        name: "phoneNumber",
        label: "Phone Number*",
        placeholder: "+1 123-456-7890",
        type: "text",
      },
      {
        name: "birthday",
        label: "Birthday*",
        placeholder: "",
        type: "date",
      },
      // {
      //   name: "employmentStatus",
      //   label: "Employment Status*",
      //   type: "radio-group",
      //   options: ["Employed", "Unemployed"],
      // },
      {
        name: "password",
        label: "Password*",
        placeholder: "Create a password",
        type: "password",
      },
      {
        name: "email",
        label: "Email*",
        placeholder: "individual@domain.com",
        type: "email",
      },
      {
        name: "currentBalance",
        label: "Current Balance (in $)*",
        placeholder: "$12000",
        type: "text",
      },
    ],
  },
  "business-client": {
    heading: "Get Started with Trillium.",
    subheading: "Register your business and create the first admin who will manage its workspace.",
    buttonText: "Create Account",
    fields: [
      {
        name: "businessName",
        label: "Business Name*",
        placeholder: "Enter company legal name",
        type: "text",
      },
      {
        name: "businessPhoneNumber",
        label: "Business Phone Number*",
        placeholder: "+1 123-456-7890",
        type: "text",
      },
      // {
      //   name: "businessId",
      //   label: "Business ID*",
      //   placeholder: "Tax ID or Registration Number",
      //   type: "text",
      // },
      {
        name: "businessEmail",
        label: "Bsuiness Email*",
        placeholder: "ops@domain.com",
        type: "email",
      },
      {
        name: "password",
        label: "Password*",
        placeholder: "Create a password",
        type: "password",
      },
      {
        name: "currentBalance",
        label: "Current Balance (in $)*",
        placeholder: "$12000",
        type: "text",
      },
    ],
  },
  "site-admin": {
    heading: "Get Started with Trillium.",
    subheading: "Create your administrator account to manage the platform.",
    buttonText: "Create Account",
    fields: [
      {
        name: "name",
        label: "Name*",
        placeholder: "Enter your full name",
        type: "text",
      },
      {
        name: "email",
        label: "Email*",
        placeholder: "admin@trillium.com",
        type: "email",
      },
      {
        name: "password",
        label: "Password*",
        placeholder: "Create a password",
        type: "password",
      },
      {
        name: "authorizationCode",
        label: "Authorization Code*",
        placeholder: "Internal access code",
        type: "text",
      },
    ],
  },
  "business-admin": {
    heading: "Get Started with Trillium.",
    subheading: "Create your administrator account to manage the business.",
    buttonText: "Create Account",
    fields: [
      {
        name: "name",
        label: "Name*",
        placeholder: "Enter your full name",
        type: "text",
      },
      {
        name: "email",
        label: "Email*",
        placeholder: "admin@yourbusiness.com",
        type: "email",
      },
      {
        name: "password",
        label: "Password*",
        placeholder: "Create a password",
        type: "password",
      },
      {
        name: "businessAccessCode",
        label: "Business Access Code*",
        placeholder: "Enter the code provided by your business",
        type: "text",
      },
    ],
  },
};

function SignInInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const accountType = location.state?.accountType ?? "individual-client";
  const [formValues, setFormValues] = useState({});
  const config = useMemo(() => ACCOUNT_SETUP_CONFIG[accountType], [accountType]);

  const updateField = (name, value) => {
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const createEntity = async (link, payload) => {
    const send = await api.put(link, payload);
    const tokens = send.data
    const status = send.status;

    if (status !== 201){
      // Error message
      toast.error(send.data);
    }

    return { status, tokens }
  }

  const submit = async (e) => {
    e.preventDefault();
    console.log({ accountType, ...formValues });
    // Ok, this is where I create a user, buiness client
    let payload;
    let link;

    // Individual Client
    if (accountType == "individual-client") {
      const { password, birthday, currentBalance, fullName, phoneNumber, email } = formValues;
      payload = {
        User_ID: {
          username: email,
          password: password,
          User_Role: "INDIVIDUAL",
        },
        Individual_BirthDate: birthday,
        Individual_Profile: "",
        Individual_PhoneNumber: phoneNumber,
        Individual_Balance: currentBalance,
        Individual_Name: fullName,
      }
      link = "api/indiv/put/create_user"
    }
    // Business Client
    else if (accountType == "business-client") {
      const { businessName, businessPhoneNumber, businessId, businessEmail, password, currentBalance } = formValues;
      payload = {
        User_ID: {
          username: businessEmail,
          password: password,
          User_Role: "BUSINESS",
        },
        Business_Balance: currentBalance,
        Business_Profile: "",
        Business_PhoneNumber: businessPhoneNumber,
        Business_Name: businessName,
        // Business_ID: businessId
      }
      link = "api/business/put/create_business"
    }

    const { status, tokens } = await createEntity(link, payload);

    // Set the acces and refresh tokens, if the creation was good.
    if (status === 201) {
      toast.success('Logged in!');
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
      navigate(signupRedirects[accountType]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={false} buttonText="Sign in" buttonLink="/signin" />

      <main className="flex items-start justify-center px-8 py-16 lg:px-12">
        <div className="w-full max-w-[540px] rounded-[32px] bg-white p-10 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
          <h1 className="text-center text-[2rem] font-semibold tracking-tight text-black">
            {config.heading}
          </h1>
          <p className="mt-3 text-center text-sm leading-6 text-[#8b5cf6]">
            {config.subheading}
          </p>

          <form className="mt-8 space-y-5" onSubmit={submit}>
            {config.fields.map((field) =>
              field.type === "radio-group" ? (
                <RadioGroupField
                  key={field.name}
                  label={field.label}
                  options={field.options}
                  value={formValues[field.name] ?? ""}
                  onChange={(value) => updateField(field.name, value)}
                />
              ) : (
                <Field
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={formValues[field.name] ?? ""}
                  onChange={(value) => updateField(field.name, value)}
                />
              )
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#1f1f1f] py-4 text-base font-semibold text-white transition hover:bg-black"
            >
              {config.buttonText}
            </button>

            <p className="text-center text-sm text-[#374151]">
              Already have an account?{" "}
              <Link to="/signin" className="font-medium text-[#8b5cf6] hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium uppercase tracking-[0.16em] text-black">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-[#f3f4f6] px-4 py-4 text-base text-[#111827] outline-none placeholder:text-[#94a3b8]"
        required
      />
    </div>
  );
}

function RadioGroupField({ label, options, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium uppercase tracking-[0.16em] text-black">
        {label}
      </label>
      <div className="flex flex-wrap gap-5 pt-2 text-sm text-[#111827]">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SignInInfo;
