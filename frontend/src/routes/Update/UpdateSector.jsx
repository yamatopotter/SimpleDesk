import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { UpdSector } from "../../pages/Update/UpdSector";
import { useEffect, useState } from "react";
import { getSector, updateSector } from "../../functions/sectorManagement";
import { toast } from "react-toastify";

export const UpdateSector = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sector, setSector] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getSector(id);

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
          navigate("/sector");
        }

        setSector(data);
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
        navigate("/sector");
      }
    }

    getData();
  }, []);

  const updateData = async (data) => {
    const response = await updateSector(data);
    if (response) {
      toast.success("Setor atualizado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(navigate("/sector"), 1000);
    } else {
      toast.error("Valide os dados inseridos.", {
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
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <UpdSector sector={sector} updateSector={updateData}/>
      </Container>
    </LoadingComponent>
  );
};
