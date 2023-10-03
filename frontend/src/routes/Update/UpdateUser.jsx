import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { getUser, updateUser } from "../../functions/userManagement";
import { UpdUser } from "../../pages/Update/UpdUser";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await getUser(id);

      if (data) {
        setUser(data);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      navigate("/user");
    }

    getData();
  }, []);

  const updateData = async (data) => {
    const response = await updateUser(data);
    if (response) {
      setTimeout(navigate("/user"), 1000);
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <UpdUser user={user} updateUser={updateData} />
      </Container>
    </LoadingComponent>
  );
};
