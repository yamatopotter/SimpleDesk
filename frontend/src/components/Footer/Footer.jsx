import {
  Circuitry,
  DesktopTower,
  FlowArrow,
  House,
  Info,
  MagnifyingGlass,
  NotePencil,
  Siren,
  User,
  UsersFour,
} from "@phosphor-icons/react";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";
import { useContext } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { useLocation, useNavigate } from "react-router-dom";

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
          text="Adicionar registro"
          onClick={() => navigate("/ticket")}
        />

        {userData.role === "ADMIN" && (
          <>
            <ButtonBottomNav
              active={checkUrl(location.pathname, "equipment")}
              icon={<DesktopTower size={24} />}
              text="Equipamentos"
              onClick={() => navigate("/equipment")}
            />
            <ButtonBottomNav
              active={checkUrl(location.pathname, "equipment_type")}
              icon={<Circuitry size={24} />}
              text="Tipo de Equipamento"
              onClick={() => navigate("/equipment_type")}
            />
            <ButtonBottomNav
              active={checkUrl(location.pathname, "sector")}
              icon={<UsersFour size={24} />}
              text="Setores"
              onClick={() => navigate("/sector")}
            />
            <ButtonBottomNav
              active={checkUrl(location.pathname, "user")}
              icon={<User size={24} />}
              text="Usuários"
              onClick={() => navigate("/user")}
            />
            <ButtonBottomNav
              active={checkUrl(location.pathname, "status")}
              icon={<FlowArrow size={24} />}
              text="Status"
              onClick={() => navigate("/status")}
            />
          </>
        )}
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
