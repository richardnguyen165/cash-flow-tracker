function LoggedInNav({ currentPage }) {
  return (
    <header className="w-full border-b border-gray-200 hover:shadow-md bg-white px-10 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Trillium</h1>
        <div className="flex items-center gap-10">
          <a
            href="/dashboard"
            className={
              currentPage === "dashboard" ? "text-purple-500" : "text-black"
            }
          >
            Dashboard
          </a>
          <a
            href="/analytics"
            className={
              currentPage === "analytics" ? "text-purple-500" : "text-black"
            }
          >
            Analytics
          </a>
          <a
            href="/profile"
            className={
              currentPage === "profile" ? "text-purple-500" : "text-black"
            }
          >
            Profile
          </a>
          <button className="rounded-full border border-purple-400 px-4 py-1 text-sm text-black">
            {" "}
            Sign Out{" "}
          </button>
        </div>
      </div>
    </header>
  );
}

export default LoggedInNav;
