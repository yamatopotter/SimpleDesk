import { useContext } from "react";
import { AuthenticationContext } from "../provider/AuthenticationProvider";
import { CommonButton } from "../components/CommonButton/CommonButton";
import { logoutUser } from "../functions/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AboutDetails = () => {
  const { userData, setUserData, setIsAuthenticated } = useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();

  function doLogout() {
    if (logoutUser(setIsAuthenticated, setUserData)) {
      toast.success("Até a próxima!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/");
    } else {
      toast.error("Houve um erro no logout.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-lg">Olá {userData.name}</h1>

      <div className="flex flex-col gap-4 mt-4">
        <CommonButton content="Logout" id="btnLogout" onClick={doLogout} />
        <CommonButton content="Alterar meus dados" id="btnUpdateMyUser" />
        <CommonButton content="Sobre o sistema" id="btnAboutSystem" />
      </div>
    </div>
  );
};
