import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoguot = () => {
    dispatch(logOut())
      .unwrap()
      .then((res) => {
        console.log(res);
        // navigate("/", { replace: true });
        // navigate("/", { replace: true });
      })
      .catch(() => {
        window.location.reload();
      });
    navigate("/", { replace: true });
  };

  return handleLoguot;
};

export default useLogout;
