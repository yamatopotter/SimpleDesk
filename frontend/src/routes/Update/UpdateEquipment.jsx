import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { UpdEquipment } from "../../pages/Update/UpdEquipment";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEquipment,
  updateEquipment,
} from "../../functions/equipmentManagement";
import { getEquipmentsType } from "../../functions/equipmentTypeManagement";
import { getSectors } from "../../functions/sectorManagement";

export const UpdateEquipment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [equipmentTypeData, setEquipmentTypeData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [equipment, setEquipment] = useState({});

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  useEffect(() => {
    async function getData() {
      try {
        const listEquipmentsType = await getEquipmentsType();
        const listSector = await getSectors();
        const equipmentData = await getEquipment(id);

        if (equipmentData === null || listEquipmentsType === null || listSector === null) {
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
          navigate("/equipment");
        }

        setEquipmentTypeData(transformToOptions(listEquipmentsType));
        setSectorData(transformToOptions(listSector));
        setEquipment(equipmentData);
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
        navigate("/equipment");
      }
    }

    getData();
  }, []);

  const updateData = async (data) => {
    const response = await updateEquipment(data);
    if (response) {
      toast.success("Equipamento atualizado com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(navigate("/equipment"), 1000);
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
        <UpdEquipment
          equipment={equipment}
          listSector={sectorData}
          listEquipmentsType={equipmentTypeData}
          updateEquipment={updateData}
        />
      </Container>
    </LoadingComponent>
  );
};
