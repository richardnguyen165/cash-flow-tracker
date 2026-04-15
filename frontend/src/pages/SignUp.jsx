import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function SignUp() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={false} />

      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg rounded-[28px] bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <h1 className="mb-2 text-3xl font-bold text-black">Sign Up</h1>
          <p className="mb-8 text-base text-purple-500">
            Create your account to start managing your assets.
          </p>
          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium uppercase text-black">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base outline-none placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium uppercase text-black">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Username@gmail.com"
                className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base outline-none placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium uppercase text-black">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base outline-none placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium uppercase text-black">
                Re-type Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base outline-none placeholder:text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-black py-4 text-base font-medium text-white transition hover:opacity-90"
            >
              Create Account
            </button>
            <p className="text-center text-sm text-black">
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-500 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
