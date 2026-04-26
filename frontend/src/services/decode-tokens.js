import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants/constants";

function decodeTokens(){
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken) {
    return null;
  }

  const decoded = jwtDecode(accessToken);

  return {
    ...decoded,
    // Older frontend files expect user_id, while the current backend token uses id.
    user_id: decoded.user_id ?? decoded.id,
    id: decoded.id ?? decoded.user_id,
  };
}

export default decodeTokens;
