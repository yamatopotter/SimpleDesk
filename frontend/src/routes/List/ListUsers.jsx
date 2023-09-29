import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getUsers } from "../../functions/userManagement";
import { ViewUsers } from "../../pages/Read/ViewUsers";
import { toast } from "react-toastify";

export const ListUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getUsers();

      if(data){
        setListUsers(data);
        setIsLoading(false);
      }
      else{
        toast.error("Erro na comunicação com a API. Tente novamente.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

    getDataFromServer();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewUsers listUsers={listUsers} />
    </LoadingComponent>
  );
};
