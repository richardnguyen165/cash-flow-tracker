import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "./Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={false} showLinks />

      <main className="px-8 py-20 lg:px-12">
        <section className="mx-auto max-w-[1440px]">
          <div className="max-w-3xl px-6 py-20 lg:px-14">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-black lg:text-7xl">
              Manage Your Cash Flow
              <br />
              With <span className="text-[#8b5cf6]">Trillium.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-[#4b5563]">
              Track contracts, invoices, payments, and recurring expenses with
              one shared finance workspace for clients, business admins, and staff.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(139,92,246,0.24)] transition hover:opacity-95"
              >
                Start now
              </Link>
              <Link
                to="/signin"
                className="rounded-2xl border border-[#d8c8ff] px-8 py-4 text-sm font-semibold text-[#8b5cf6] transition hover:bg-[#faf6ff]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
