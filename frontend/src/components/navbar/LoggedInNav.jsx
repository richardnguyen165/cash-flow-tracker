import { Link, NavLink } from "react-router-dom";

function LoggedInNav({
  brandLink = "/dashboard",
  navItems = [],
  actionLabel = "Sign Out",
  actionLink = "/signin",
}) {
  const navClass = ({ isActive }) =>
    `border-b-2 pb-1 text-sm font-medium transition ${
      isActive
        ? "border-[#8b5cf6] text-black"
        : "border-transparent text-[#6b7280] hover:text-black"
    }`;

  function clearCookies(){
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  return (
    <header className="sticky top-0 z-20 w-full border-b border-[#ececf2] bg-white/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-8">
        <Link to={brandLink} className="text-xl font-semibold tracking-tight text-black">
          Trillium
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to={actionLink}
          onClick={() => clearCookies()}
          className="rounded-full border border-[#9f67ff] px-4 py-2 text-sm font-medium text-[#8b5cf6] transition hover:bg-[#f7f1ff]"
        >
          {actionLabel}
        </Link>
      </div>
    </header>
  );
}

export default LoggedInNav;
