import {
  Circuitry,
  DesktopTower,
  FlowArrow,
  User,
  UsersFour,
} from "@phosphor-icons/react";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";

export const AdminMenu = ({ checkUrl, navigate }) => {
  return (
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
  );
};
