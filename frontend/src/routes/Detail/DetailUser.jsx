import { useEffect, useState } from "react";
import { ViewUser } from "../../pages/Read/ViewUser";
import { getUser } from "../../functions/userManagement";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { Container } from "../../components/Container";

export const DetailUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getUser(id);

      if (data) {
        setUser(data);
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
        setIsLoading(false);
      }
    }

    getDataFromServer();
  }, []);
  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <ViewUser user={user} />
      </Container>
    </LoadingComponent>
  );
};
