import { toast } from "react-toastify";
import { deleteEquipment, getEquipments } from "../../functions/equipmentManagement";
import { ViewEquipments } from "../../pages/Read/ViewEquipments";
import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const ListEquipments = () => {
  const [listEquipments, setListEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function deleteData(id) {
    const newList = listEquipments.filter((item) => item.id !== id);
    const response = await deleteEquipment(id);
    if (response) {
      setListEquipments(newList);
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
      const data = await getEquipments();

      if (data) {
        setListEquipments(data);
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
        <ViewEquipments
          equipments={listEquipments}
          deleteEquipment={deleteData}
        />
      </Container>
    </LoadingComponent>
  );
};
