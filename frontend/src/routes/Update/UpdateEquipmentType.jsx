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
      const data = await getEquipmentType(id);

      if (data) {
        setEquipmentType(data);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/equipment_type");
    }

    getData();
  }, []);

  const updateData = async (data) => {
    const response = await updateEquipmentType(data);
    if (response) {
      setTimeout(navigate("/equipment_type"), 1000);
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
