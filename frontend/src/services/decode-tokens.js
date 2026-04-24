import { jwtDecode } from "jwt-decode";

// https://www.npmjs.com/package/jwt-decode

function decodeTokens(){
  const accessToken = localStorage.getItem("access");
  const decoded = jwtDecode(accessToken);
  console.log(decoded);
  return decoded;
}

export default decodeTokens;