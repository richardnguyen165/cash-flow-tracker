import { Link } from "react-router-dom";

function LoggedOutNav({ buttonText, buttonLink, showLinks = false }) {
  return (
    <header className="w-full border-b border-[#ececf2] bg-white px-8 py-5">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8">
        <Link to="/" className="text-4xl font-bold tracking-tight text-[#111827]">
          Trillium
        </Link>

        {showLinks ? (
          <nav className="hidden items-center gap-10 text-sm font-medium text-[#4b5563] md:flex">
            <span>Dashboard</span>
            <span>Analytics</span>
            <span>Profile</span>
          </nav>
        ) : (
          <div />
        )}

        <Link
          to={buttonLink}
          className="rounded-full border border-[#9f67ff] px-5 py-2 text-sm font-medium text-[#8b5cf6] transition hover:bg-[#f7f1ff]"
        >
          {buttonText}
        </Link>
      </div>
    </header>
  );
}

export default LoggedOutNav;
