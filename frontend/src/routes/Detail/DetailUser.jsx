import { useEffect, useState } from "react";
import { ViewUser } from "../../pages/Read/ViewUser";
import { getUser } from "../../functions/userManagement";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { Container } from "../../components/Container";

export const DetailUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getUser(id);

      if (data) {
        setUser(data);
        setIsLoading(false);
      }
      setIsLoading(false);
      navigate("/user");
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
