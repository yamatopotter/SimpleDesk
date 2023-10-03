import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { deleteUser, getUsers } from "../../functions/userManagement";
import { ViewUsers } from "../../pages/Read/ViewUsers";
import { toast } from "react-toastify";
import { Container } from "../../components/Container";
import { useNavigate } from "react-router-dom";

export const ListUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getUsers();

      if (data) {
        setListUsers(data);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/home");
    }

    getDataFromServer();
  }, []);

  const deleteData = async (id) => {
    const newList = listUsers.filter((user) => user.id !== id);
    const request = deleteUser(id);
    if (request) {
      setListUsers(newList);
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
