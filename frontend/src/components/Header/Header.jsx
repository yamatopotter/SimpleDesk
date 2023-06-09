import { DesktopTower } from "@phosphor-icons/react";

export const Header = () => {
  return (
    <header className="w-full">
      <nav className="flex bg-violet-700 text-white p-3 justify-between items-center">
        <div className="flex gap-5 items-center">
          <DesktopTower size={32} />
          <p className="text-xl">Simple Desk</p>
        </div>

        <p>
          Olá, fulano
        </p>
      </nav>
    </header>
  );
};
