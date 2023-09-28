import { getEquipments } from "../../functions/equipmentManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { AddTicket } from "../../pages/Create/AddTicket";
import { useEffect, useState } from "react";

export const CreateTicket = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  useEffect(() => {
    async function getData() {
      const data = await getEquipments();
      setEquipmentList(transformToOptions(data));
      setIsLoading(false)
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <AddTicket equipmentList={equipmentList} />
    </LoadingComponent>
  );
};
