import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={false} buttonText="Sign up" buttonLink="/signup" />
      <main className="flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-lg rounded-[28px] bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <h1 className="mb-2 text-3xl font-bold text-black">Sign In</h1>
          <p className="mb-8 text-base text-purple-500">
            Enter your credentials to manage your assets.
          </p>
          <form className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium uppercase text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="Username@gmail.com"
                className="w-full rounded-xl bg-gray-100 px-4 py-4 text-base outline-none placeholder:text-gray-500"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium uppercase text-black">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-purple-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
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
              Sign In
            </button>
            <div className="space-y-1 text-center">
              <p className="text-center text-sm text-black">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-purple-500 hover:underline">
                  Sign up
                </Link>
              </p>
              <p className="text-center text-sm text-black">
                Site admin? Go to{" "}
                <Link
                  to="/siteadmin"
                  className="text-purple-500 hover:underline"
                >
                  this
                </Link>{" "}
                sign in page
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
