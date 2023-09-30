import { toast } from "react-toastify";
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
      try {
        const data = await getUser(id);

        if (data == null) {
          toast.error(
            "Houve um erro no carregamento dos dados, tente novamente.",
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
          setIsLoading(false);
          navigate("/user");
        }

        setUser(user);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        toast.error(
          "Houve um erro no carregamento dos dados, tente novamente.",
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
        setIsLoading(false);
        navigate("/user");
      }
    }

    getData();
  }, []);

  const updateData = async (data) => {
    const response = await updateUser(data);
    if (response) {
      toast.success("Usuário atualizado com sucesso.", {
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
      toast.error(
        "Valide os dados inseridos.",
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
        <UpdUser user={user} updateUser={updateData} />
      </Container>
    </LoadingComponent>
  );
};
