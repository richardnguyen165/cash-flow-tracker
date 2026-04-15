import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

function Landing() {
  return (
      <div className="mx-auto min-h-[85vh] max-w-375 bg-[#f5f5f5]">
        <Navbar isLoggedIn={false} />
        <main className="px-24 py-32">
          <div className="max-w-150">
            <h1 className="text-7xl font-bold leading-tight text-black">
              Manage Your Assets
              <br />
              With <span className="text-purple-500">Trillium.</span>
            </h1>
            <p className="mt-8 text-2xl text-black">
              Track billables and recurring expenses with your financial tool.
            </p>
            <Link
              to="/signup"
              className="mt-10 inline-block rounded-2xl bg-purple-500 px-10 py-4 text-base font-medium text-white transition hover:opacity-90"
            >
              Start now
            </Link>
          </div>
        </main>
      </div>
  );
}
export default Landing;
