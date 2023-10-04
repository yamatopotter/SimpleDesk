import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { getUser, updateUser } from "../../functions/userManagement";
import { UpdUser } from "../../pages/Update/UpdUser";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { updateLiveUserData } from "../../functions/auth";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userData, setUserData } = useContext(AuthenticationContext);

  useEffect(() => {
    async function getData() {
      if (id) {
        const data = await getUser(id);

        if (data) {
          setUser(data);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        navigate("/user");
      } else {
        const data = await getUser(userData.id);

        if (data) {
          setUser(data);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        navigate("/user");
      }
    }

    getData();
  }, []);

  const updateData = async (data) => {
    const response = await updateUser(data);
    if (response) {
      if (id) {
        setTimeout(navigate("/user"), 1000);
      } else {
  
        updateLiveUserData(response, setUserData);
        setTimeout(navigate("/about"), 1000);
      }
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
