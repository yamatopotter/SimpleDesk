import { toast } from "react-toastify";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import {
  getEquipmentType,
  updateEquipmentType,
} from "../../functions/equipmentTypeManagement";
import { UpdEquipmentType } from "../../pages/Update/UpdEquipmentType";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateEquipmentType = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [equipmentType, setEquipmentType] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getEquipmentType(id);

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
          navigate("/equipment_type");
        }

        setEquipmentType(data);
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
        navigate("/equipment_type");
      }
    }

    getData();
  }, []);

  const updateData = async (data) => {
    const response = await updateEquipmentType(data);
    if (response) {
      toast.success("Tipo de equipamento atualizado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(navigate("/equipment_type"), 1000);
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
        <UpdEquipmentType
          equipmentType={equipmentType}
          updateEquipmentType={updateData}
        />
      </Container>
    </LoadingComponent>
  );
};
