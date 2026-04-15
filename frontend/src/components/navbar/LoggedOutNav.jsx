import { Link } from "react-router-dom";

function LoggedOutNav({ buttonText, buttonLink }) {
  return (
    <header className="w-full border-b border-gray-200 hover:shadow-md bg-white px-10 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-black"> Trillium </h1>
        <Link
          to={buttonLink}
          className="rounded-full border border-purple-500 px-4 py-1 text-sm text-purple-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-50 hover:shadow-md"
        >
          {buttonText}
        </Link>
      </div>
    </header>
  );
}

export default LoggedOutNav;
