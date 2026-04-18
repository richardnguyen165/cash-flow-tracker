import LoggedInNav from "../components/navbar/LoggedInNav";

function MainLayout({
  sidebar,
  children,
  contentClassName = "",
  navItems = [],
  brandLink = "/dashboard",
}) {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <LoggedInNav brandLink={brandLink} navItems={navItems} />
      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-[1600px]">
        {sidebar}
        <main className={`flex-1 px-8 py-8 lg:px-12 ${contentClassName}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
