import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

function Navbar({
  isLoggedIn = false,
  buttonText = "Sign in",
  buttonLink = "/signin",
  currentPage = "",
  showLinks = false,
}) {
  return isLoggedIn ? (
    <LoggedInNav currentPage={currentPage} />
  ) : (
    <LoggedOutNav
      buttonText={buttonText}
      buttonLink={buttonLink}
      showLinks={showLinks}
    />
  );
}

export default Navbar;
