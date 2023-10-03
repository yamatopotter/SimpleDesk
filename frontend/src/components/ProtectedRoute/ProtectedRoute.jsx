import { useContext } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const { userData } = useContext(AuthenticationContext);

  if (userData.role == "ADMIN") {
    return props.children;
  } else {
    toast.error("Você não possui o os privilégios para acessar essa área do sistema.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return <Navigate to="/home" />
  }
};
