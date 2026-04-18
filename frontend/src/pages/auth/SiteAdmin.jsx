import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function SiteAdmin() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isLoggedIn={false}
        buttonText="Client sign in"
        buttonLink="/signin"
      />

      <main className="flex items-start justify-center px-8 py-16 lg:px-12">
        <div className="w-full max-w-[520px] rounded-[32px] bg-white p-10 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
          <h1 className="text-center text-4xl font-semibold tracking-tight text-black">
            Admin Sign In
          </h1>
          <p className="mt-4 text-center text-base text-[#8b5cf6]">
            Use your internal credentials to access the administration workspace.
          </p>

          <form className="mt-10 space-y-6">
            <Field label="Work email" placeholder="admin@trillium.com" type="email" />
            <Field label="Password" placeholder="Enter your password" type="password" />

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#1f1f1f] py-4 text-base font-semibold text-white transition hover:bg-black"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-[#374151]">
              Need the standard workspace?{" "}
              <Link to="/signin" className="font-medium text-[#8b5cf6] hover:underline">
                Return to client sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, placeholder, type }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium uppercase tracking-[0.16em] text-black">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-[#f3f4f6] px-4 py-4 text-base text-[#111827] outline-none placeholder:text-[#94a3b8]"
      />
    </div>
  );
}

export default SiteAdmin;
