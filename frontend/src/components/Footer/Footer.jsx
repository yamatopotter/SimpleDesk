import { House, Info, MagnifyingGlass, Siren } from "@phosphor-icons/react";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";
import { useContext } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
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
          active={checkUrl(location.pathname, "ticket")}
          icon={<Siren size={24} />}
          text="Abrir Chamado"
          onClick={() => navigate("/ticket/new")}
        />
        <ButtonBottomNav
          active={checkUrl(location.pathname, "tickets")}
          icon={<MagnifyingGlass size={24} />}
          text="Ver Chamados"
          onClick={() => navigate("/tickets")}
        />
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
    <footer className="text-center bg-violet-700 text-white p-3">
      Projeto desenvolvido por @yamatopotter e @dougsn
    </footer>
  );
};
