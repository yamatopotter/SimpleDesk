import { useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { UpdPassword } from "../../pages/Update/UpdPassword";

export const UpdatePassword = () => {
  const { id } = useParams();

  return (
    <Container>
      <UpdPassword user={id} />
    </Container>
  );
};
