import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Navbar from "../../components/navbar/Navbar";

function SignUp() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("business-client");

  const accountTypes = [
    {
      id: "business-client",
      title: "Business Client",
      description:
        "Register a business on the platform and create its first business admin workspace.",
    },
    {
      id: "individual-client",
      title: "Individual Client",
      description:
        "Review your contracts, invoice details, balances, and payment history.",
    },
    {
      id: "site-admin",
      title: "Site Admin",
      description:
        "Restricted platform access used for moderation, approvals, and global controls.",
    },
    {
      id: "business-admin",
      title: "Business Admin",
      description:
        "Join or finish setting up an existing business workspace with administrator access.",
    },
  ];

  const submit = (e) => {
    e.preventDefault();
    navigate("/signininfo", { state: { accountType: selectedType } });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={false} buttonText="Sign in" buttonLink="/signin" />

      <main className="flex items-start justify-center px-8 py-16 lg:px-12">
        <div className="w-full max-w-[620px] rounded-[32px] bg-white p-10 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
          <h1 className="text-center text-4xl font-semibold tracking-tight text-black">
            Sign Up
          </h1>
          <p className="mt-3 text-center text-base text-[#8b5cf6]">
            Select your account type.
          </p>

          <form className="mt-8 space-y-4" onSubmit={submit}>
            {accountTypes.map((item) => {
              const isSelected = selectedType === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedType(item.id)}
                  className={`flex w-full items-start justify-between rounded-2xl border px-5 py-5 text-left transition ${
                    isSelected
                      ? "border-[#c9b2ff] bg-[#f3efff]"
                      : "border-[#ececf2] bg-[#fafafa] hover:border-[#d8d8e4]"
                  }`}
                >
                  <div>
                    <p className="text-lg font-semibold text-[#111827]">
                      {item.title}
                    </p>
                    <p className="mt-1 max-w-xl text-sm leading-6 text-[#6b7280]">
                      {item.description}
                    </p>
                  </div>
                  <CheckCircleIcon
                    className={`mt-1 h-5 w-5 ${
                      isSelected ? "text-[#8b5cf6]" : "text-transparent"
                    }`}
                  />
                </button>
              );
            })}

            <button
              type="submit"
              className="mt-4 w-full rounded-2xl bg-[#1f1f1f] py-4 text-base font-semibold text-white transition hover:bg-black"
            >
              Continue
            </button>

            <p className="text-center text-sm text-[#6b7280]">
              { selectedType ? displayInformationText(accountTypes, selectedType) : "Please pick a role!"}
            </p>

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

function displayInformationText(accountRoles, selectedRole) {
  for (const role of accountRoles){
    if (role.id === selectedRole){
      return role.description;
    }
  }
}

export default SignUp;
