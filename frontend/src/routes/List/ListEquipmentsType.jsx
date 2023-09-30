import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ViewEquipmentsType } from "../../pages/Read/ViewEquipmentsType";
import {
  deleteEquipmentType,
  getEquipmentsType,
} from "../../functions/equipmentTypeManagement";
import { toast } from "react-toastify";

export const ListEquipmentsType = () => {
  const [listEquipmentsType, setListEquipmentsType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function deleteData(id) {
    const newList = listEquipmentsType.filter((item) => item.id !== id);
    const response = await deleteEquipmentType(id);
    if (response) {
      setListEquipmentsType(newList);
      toast.success("Tipo de equipamento excluído com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(
        "Não é possivel excluir porque há informações vinculadas a esse setor",
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
    }
  }

  useEffect(() => {
    async function getData() {
      const data = await getEquipmentsType();

      if (data) {
        setListEquipmentsType(data);
        setIsLoading(false);
      } else {
        toast.error("Erro na comunicação com a API. Tente novamente.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      }
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
