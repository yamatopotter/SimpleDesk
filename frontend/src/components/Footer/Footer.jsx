import { House, Info, MagnifyingGlass, Siren } from "@phosphor-icons/react"
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";

export const Footer = () => {
    if(true){
        return (
          <div className="flex w-full p-2 text-center items-center overflow-x-scroll justify-between bg-violet-950">
            <ButtonBottomNav
              active={true}
              icon={<House size={24} />}
              text="Início"
            />
            <ButtonBottomNav
              active={false}
              icon={<Siren size={24} />}
              text="Abrir Chamado"
            />
            <ButtonBottomNav
              active={false}
              icon={<MagnifyingGlass size={24} />}
              text="Ver Chamados"
            />
            <ButtonBottomNav
              active={false}
              icon={<Info size={24} />}
              text="Sobre"
            />
          </div>
        );
    }

    return (
        <footer className="text-center bg-violet-700 text-white p-3">
            Projeto desenvolvido por @yamatopotter e @dougsn
        </footer>
    )
}