import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { UpdEquipment } from "../../pages/Update/UpdEquipment";
import { useNavigate, useParams } from "react-router-dom";
import { getEquipment } from "../../functions/equipmentManagement";
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
      const listEquipmentsType = await getEquipmentsType();
      const listSector = await getSectors();
      const equipmentData = await getEquipment(id);

      if (equipmentData && listEquipmentsType && listSector) {
        setEquipmentTypeData(transformToOptions(listEquipmentsType));
        setSectorData(transformToOptions(listSector));
        setEquipment(equipmentData);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/equipment");
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <UpdEquipment
          equipment={equipment}
          listSector={sectorData}
          listEquipmentsType={equipmentTypeData}
          navigate={navigate}
        />
      </Container>
    </LoadingComponent>
  );
};
