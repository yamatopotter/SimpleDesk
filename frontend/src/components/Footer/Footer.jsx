import { Code, Coffee, Heart, House, Info, NotePencil, Siren } from "@phosphor-icons/react";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";
import { useContext } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminMenu } from "../AdminMenu/AdminMenu";

export const Footer = () => {
  const { isAuthenticated, userData } = useContext(AuthenticationContext);
  const location = useLocation();
  const navigate = useNavigate();

  const checkUrl = (url, place) => {
    const part = url.split("/");
    if (part[1] === place) {
      return true;
    }

    return false;
  };

  if (isAuthenticated) {
    return (
      <div className="flex w-full p-2 text-center items-center overflow-x-scroll justify-between bg-violet-950">
        <ButtonBottomNav
          active={location.pathname === "/home" ? true : false}
          icon={<House size={24} />}
          text="Início"
          onClick={() => navigate("/home")}
        />
        <ButtonBottomNav
          active={location.pathname == "/ticket/new" ? true : false}
          icon={<Siren size={24} />}
          text="Abrir Chamado"
          onClick={() => navigate("/ticket/new")}
        />
        <ButtonBottomNav
          active={location.pathname == "/ticket" ? true : false}
          icon={<NotePencil size={24} />}
          text="Chamados"
          onClick={() => navigate("/ticket")}
        />

        {userData.role === "ADMIN" && <AdminMenu checkUrl={checkUrl} />}
        <ButtonBottomNav
          active={location.pathname === "/about" ? true : false}
          icon={<Info size={24} />}
          text="Sobre"
          onClick={() => navigate("/about")}
        />
      </div>
    );
  }

  return (
    <footer className="flex gap-2 justify-center bg-violet-700 text-white p-3">
      <Code size={24} /> com <Coffee size={24} /> por{" "}
      <a href="https://github.com/yamatopotter" target="_blank" className="font-medium underline">
        Matheus
      </a>{" "}
      &{" "}
      <a href="https://github.com/dougsn" target="_blank" className="font-medium underline">
        Douglas
      </a>
    </footer>
  );
};
