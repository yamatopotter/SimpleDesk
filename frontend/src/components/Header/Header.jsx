import { DesktopTower, SignOut } from "@phosphor-icons/react";
import { useContext, useEffect, useState, Suspense } from "react";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";
import { getUserData, logoutUser } from "../../functions/auth";
import { Footer } from "../Footer/Footer";
import { toast } from "react-toastify";
import { ButtonBottomNav } from "../ButtonBottomNav/ButtonBottomNav";

export const Header = () => {
  const { isAuthenticated, userData, setUserData, setIsAuthenticated } =
    useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  async function getData() {
    try {
      const response = await getUserData(setIsAuthenticated, setUserData);
      // User is not authenticated
      if (response === false) {
        // User is not authenticated and trying to access a protected route
        if (isAuthenticated === false && location.pathname !== "/") {
          toast.error("Você precisa estar autenticado para usar o sistema.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
          setIsLoading(false);
          return false;
        }
        navigate("/");
        setIsLoading(false);
        return false;
      }

      // User is authenticated
      setIsLoading(false);
      return true;
    } catch {
      // Error on trying
      setIsLoading(false);
      return false;
    }
  }

  useEffect(() => {
    getData();
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
            <div className="flex items-center">
              <p className="bg-violet-950 p-2 rounded-full uppercase text-sm">
                {userData.name.slice(0, 2)}
              </p>
              <ButtonBottomNav
                icon={<SignOut size={24} />}
                onClick={() => {
                  if (logoutUser(setIsAuthenticated, setUserData)) {
                    navigate("/");
                    toast.success("Até a próxima", {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  } else {
                    toast.error("Não foi possível fazer logout", {
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
                }}
                className={``}
              />
            </div>
          ) : null}
        </nav>
      </header>

      <main className="flex flex-1 overflow-y-scroll no-scrollbar p-4">
        <Suspense fallback={<LoadingComponent isLoading={true} />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </LoadingComponent>
  );
};
