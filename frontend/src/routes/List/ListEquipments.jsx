import {
  deleteEquipment,
  getEquipments,
} from "../../functions/equipmentManagement";
import { ViewEquipments } from "../../pages/Read/ViewEquipments";
import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";

export const ListEquipments = () => {
  const [listEquipments, setListEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function deleteData(id) {
    const newList = listEquipments.filter((item) => item.id !== id);
    const response = await deleteEquipment(id);
    if (response) {
      setListEquipments(newList);
    }
  }

  useEffect(() => {
    async function getData() {
      const data = await getEquipments();

      if (data) {
        setListEquipments(data);
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
        <ViewEquipments
          equipments={listEquipments}
          deleteEquipment={deleteData}
        />
      </Container>
    </LoadingComponent>
  );
};
