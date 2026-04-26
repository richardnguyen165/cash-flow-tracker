import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinRedirects } from "../../config/workspaceNav";
import Navbar from "../../components/navbar/Navbar";
import decodeTokens from "../../services/decode-tokens";
import api from "../../services/api";
import toast from "react-hot-toast";

function SignIn() {

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("individual-client");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // If the user already has refresh and access tokens, no need to sign them in 
  // https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    // The user left the application without signing out on their computer
    if (accessToken) {
      try{
      const decodedToken = decodeTokens();
      const { User_Role } = decodedToken;

      if (User_Role === "INDIVIDUAL") {
        navigate("/dashboard");
      }
      else if (User_Role === "SITE_ADMIN") {
        navigate("/admin/dashboard");
      }
      else if (User_Role === "BUSINESS_ADMIN"){
        navigate("/business/dashboard");
      } else if (User_Role === "EMPLOYEE") {
        navigate("/employee/dashboard");
      } else {
        // Could be apart of business - we dont want to log in, business admin handles that 
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
      } catch (_) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
  }, [])

  const signInRoles = [
    {
      id: "individual-client",
      title: "Individual Client",
      description: "Access your contracts, invoices, balances, and payment history.",
    },
    {
      id: "business-admin",
      title: "Business Admin",
      description: "Sign in on behalf of a business to manage contracts, billing, and staff.",
    },
    {
      id: "employee",
      title: "Employee / Staff",
      description: "Use the workspace your business admin assigned to you for tasks and expenses.",
    },
    {
      id: "site-admin",
      title: "Site Admin",
      description: "Use restricted platform administration access.",
    },
  ];

  const submit = async (event) => {
    event.preventDefault();
    try {
      const logInAttempt =  await api.post("api/token/", {
        username: username,
        password: password,
        User_Role: selectedRole
      })
      setUsername("");
      setPassword("");

      const { access, refresh } = logInAttempt.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      navigate(signinRedirects[selectedRole]);
    } catch (error) {
      toast.error("Failed to sign in.")
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isLoggedIn={false}
        buttonText="Create account"
        buttonLink="/signup"
      />

      <main className="flex items-start justify-center px-8 py-16 lg:px-12">
        <div className="w-full max-w-[520px] rounded-[32px] bg-white p-10 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
          <h1 className="text-center text-4xl font-semibold tracking-tight text-black">
            Sign In
          </h1>
          <p className="mt-4 text-center text-base text-[#8b5cf6]">
            Choose how you&apos;re accessing Trillium, then sign in to the right workspace.
          </p>

          <div className="mt-8 grid gap-3">
            {signInRoles.map((role) => {
              const isSelected = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    isSelected
                      ? "border-[#c9b2ff] bg-[#f3efff]"
                      : "border-[#ececf2] bg-[#fafafa] hover:border-[#d8d8e4]"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#111827]">{role.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6b7280]">
                    {role.description}
                  </p>
                </button>
              );
            })}
          </div>

          <form className="mt-8 space-y-6" onSubmit={submit}>
            <Field label="Email" placeholder="Username@gmail.com" type="email" value={username}
            onChange={(e)=> setUsername(e.target.value)}/>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium uppercase tracking-[0.16em] text-black">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#8b5cf6] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl bg-[#f3f4f6] px-4 py-4 text-base text-[#111827] outline-none placeholder:text-[#94a3b8]"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#1f1f1f] py-4 text-base font-semibold text-white transition hover:bg-black"
            >
              Sign In
            </button>

            <div className="space-y-2 text-center text-sm text-[#374151]">
              <p className="text-[#6b7280]">
                { selectedRole ? displayInformationText(signInRoles, selectedRole) : "Please pick a role!"}
              </p>
              <p>
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="font-medium text-[#8b5cf6] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function displayInformationText(signInRoles, selectedRole) {
  for (const role of signInRoles){
    if (role.id === selectedRole){
      return role.description;
    }
  }
}

function Field({ label, placeholder, type, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium uppercase tracking-[0.16em] text-black">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-[#f3f4f6] px-4 py-4 text-base text-[#111827] outline-none placeholder:text-[#94a3b8]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SignIn;
