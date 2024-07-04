import { useDispatch } from "react-redux";
import { clearUsername } from "../redux/username/usernameSlice";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUsername());
    window.location.href = "/login";
  };

  return logout;
};

export default useLogout;
