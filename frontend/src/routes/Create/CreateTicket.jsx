import { getEquipments } from "../../functions/equipmentManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { AddTicket } from "../../pages/Create/AddTicket";
import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { useNavigate } from "react-router-dom";

export const CreateTicket = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  useEffect(() => {
    async function getData() {
      const data = await getEquipments();
      if (data) {
        setEquipmentList(transformToOptions(data));
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      navigate("/ticket");
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <AddTicket equipmentList={equipmentList} />
      </Container>
    </LoadingComponent>
  );
};
