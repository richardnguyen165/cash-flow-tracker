import { Link, NavLink } from "react-router-dom";

function LoggedInNav() {
  const navClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-purple-500" : "text-black hover:text-purple-500"
    }`;

  return (
    <header className="w-full border-b border-gray-200 hover:shadow-md bg-white px-10 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-4xl font-bold">
          Trillium
        </Link>
        <div className="flex items-center gap-10">
          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className={navClass}>
            Analytics
          </NavLink>
          <NavLink to="/profile" className={navClass}>
            Profile
          </NavLink>
          <button className="rounded-full border border-purple-400 px-4 py-1 text-sm text-black">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}

export default LoggedInNav;
