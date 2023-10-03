import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { UpdPassword } from "../../pages/Update/UpdPassword";
import { updateUserPassword } from "../../functions/userManagement";

export const UpdatePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const updateData = async (data) => {
    const response = await updateUserPassword(data);

    if (response) {
      setTimeout(navigate("/user"), 1000);
    }
  };

  return (
    <Container>
      <UpdPassword updatePassword={updateData} user={id} />
    </Container>
  );
};
