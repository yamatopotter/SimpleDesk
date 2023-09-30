import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { UpdPassword } from "../../pages/Update/UpdPassword";
import { updateUserPassword } from "../../functions/userManagement";
import { toast } from "react-toastify";

export const UpdatePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const updateData = async (data) => {
    const response = await updateUserPassword(data);

    if (response) {
      toast.success("Senha atualizada com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(navigate("/user"), 1000);
    } else {
      toast.error("Houve um erro na hora de atualizar a senha.", {
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
  };

  return (
    <Container>
      <UpdPassword updatePassword={updateData} user={id} />
    </Container>
  );
};
