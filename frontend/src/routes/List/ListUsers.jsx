import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { getUsers } from "../../functions/userManagement";
import { ViewUsers } from "../../pages/Read/ViewUsers";

export const ListUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUsersList() {
      const data = await getUsers();
      setListUsers(data);
      setIsLoading(false);
    }

    getUsersList();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewUsers listUsers={listUsers} />;
    </LoadingComponent>
  );
};
