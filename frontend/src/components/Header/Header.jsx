import { DesktopTower } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { Outlet } from "react-router-dom";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";
import { getUserData } from "../../functions/auth";
import { Footer } from "../Footer/Footer";

export const Header = () => {
  const { isAuthenticated, userData, setUserData, setIsAuthenticated } = useContext(
    AuthenticationContext
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserData(setIsAuthenticated, setUserData);
    setIsLoading(false);
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <header className="w-full">
        <nav className="flex bg-violet-700 text-white p-3 justify-between items-center">
          <div className="flex gap-5 items-center">
            <DesktopTower size={32} />
            <p className="text-xl">Simple Desk</p>
          </div>

          {isAuthenticated ? (
            <p className="bg-violet-950 p-2 rounded-full uppercase text-sm">
              {userData.name.slice(0, 2)}
            </p>
          ) : null}
        </nav>
      </header>

      <main className="flex flex-1 overflow-y-scroll no-scrollbar p-4">
        <Outlet />
      </main>

      <Footer />
    </LoadingComponent>
  );
};
