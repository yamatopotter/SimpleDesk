import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewEquipmentsType } from "../../pages/Read/ViewEquipmentsType";
import {
  deleteEquipmentType,
  getEquipmentsType,
} from "../../functions/equipmentTypeManagement";
import { useNavigate } from "react-router-dom";

export const ListEquipmentsType = () => {
  const [listEquipmentsType, setListEquipmentsType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function deleteData(id) {
    const newList = listEquipmentsType.filter((item) => item.id !== id);
    const response = await deleteEquipmentType(id);
    if (response) {
      setListEquipmentsType(newList);
    }
  }

  useEffect(() => {
    async function getData() {
      const data = await getEquipmentsType();

      if (data) {
        setListEquipmentsType(data);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/home");
    }
    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <ViewEquipmentsType
          equipmentsType={listEquipmentsType}
          deleteEquipmentType={deleteData}
        />
      </Container>
    </LoadingComponent>
  );
};
