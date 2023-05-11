import { House, Info, MagnifyingGlass, Siren } from "@phosphor-icons/react"

export const Footer = () => {
    if(true){
        return (
          <div className="flex w-full text-center items-center justify-around">
            <button className="relative h-full basis-full flex flex-col items-center justify-center gap-3 transition-all ease-in-out duration-300 hover:bg-violet-700 hover:text-white">
              <House size={24} />
              <span className="text-sm">Inicio</span>
            </button>

            <button className="relative h-full basis-full flex flex-col items-center justify-center gap-3 transition-all ease-in-out duration-300 hover:bg-violet-700 hover:text-white">
              <Siren size={24} />
              <span className="text-sm">Abrir Chamado</span>
            </button>

            <button className="relative h-full basis-full flex flex-col items-center justify-center gap-3 transition-all ease-in-out duration-300 hover:bg-violet-700 hover:text-white">
              <MagnifyingGlass size={24} />
              <span className="text-sm">Ver chamados</span>
            </button>

            <button className="relative h-full basis-full flex flex-col items-center justify-center gap-3 transition-all ease-in-out duration-300 hover:bg-violet-700 hover:text-white">
              <Info size={24} />
              <span className="text-sm">Sobre</span>
            </button>
          </div>
        );
    }

    return (
        <footer className="text-center bg-violet-700 text-white p-3">
            Projeto desenvolvido por @yamatopotter e @dougsn
        </footer>
    )
}