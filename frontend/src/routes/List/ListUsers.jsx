import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { deleteUser, getUsers } from "../../functions/userManagement";
import { ViewUsers } from "../../pages/Read/ViewUsers";
import { toast } from "react-toastify";
import { Container } from "../../components/Container";

export const ListUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getUsers();

      if (data) {
        setListUsers(data);
        setIsLoading(false);
      } else {
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

  const deleteData = async (id) => {
    const newList = listUsers.filter((user) => user.id !== id);
    const request = deleteUser(id);
    if (request) {
      setListUsers(newList);
      toast.success("Usuário excluído com sucesso", {
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
      toast.error(
        "Não é possivel excluir porque há informações vinculadas a esse eixo",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <ViewUsers listUsers={listUsers} deleteUser={deleteData} />
      </Container>
    </LoadingComponent>
  );
};
