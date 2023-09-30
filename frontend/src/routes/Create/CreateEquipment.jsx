import { Container } from "../../components/Container";
import { AddEquipment } from "../../pages/Create/AddEquipment";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getEquipmentsType } from "../../functions/equipmentTypeManagement";
import { getSectors } from "../../functions/sectorManagement";

export const CreateEquipment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [equipmentType, setEquipmentType] = useState([]);
  const [sector, setSector] = useState([]);

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  useEffect(() => {
    async function getData() {
      const responseEquipmentsType = await getEquipmentsType();
      const responseSector = await getSectors();

      if (responseEquipmentsType && responseSector) {
        setEquipmentType(transformToOptions(responseEquipmentsType));
        setSector(transformToOptions(responseSector));
        setIsLoading(false);
      } else {
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

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <AddEquipment equipmentType={equipmentType} sector={sector} />
      </Container>
    </LoadingComponent>
  );
};
