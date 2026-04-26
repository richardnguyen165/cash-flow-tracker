import { NavLink } from "react-router-dom";

function WorkspaceSidebar({
  userName,
  subtitle,
  meta,
  navItems,
  // summaryLabel,
  // summaryValue,
  // summaryHint,
}) {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "border-l-4 border-[#8b5cf6] bg-white text-black shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
        : "text-[#4b5563] hover:bg-white hover:text-black"
    }`;

  return (
    <aside className="w-[280px] border-r border-[#ececf2] bg-[#f7f7fa] px-5 py-7">
      <div className="rounded-3xl bg-transparent p-4">
        <div>
          <p className="text-base font-semibold text-black">{userName}</p>
          <p className="mt-1 text-sm text-[#6b7280]">{subtitle}</p>
          <p className="text-xs text-[#9ca3af]">{meta}</p>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={navClass}>
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* <div className="mt-10 rounded-3xl bg-[#ede9fe] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8b5cf6]">
            {summaryLabel}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-black">
            {summaryValue}
          </p>
          <p className="mt-2 text-sm text-[#4b5563]">{summaryHint}</p>
        </div> */}
      </div>
    </aside>
  );
}

export default WorkspaceSidebar;
