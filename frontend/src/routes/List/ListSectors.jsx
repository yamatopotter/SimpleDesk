import { useEffect, useState } from "react";
import { ViewSectors } from "../../pages/Read/ViewSectors";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { deleteSector, getSectors } from "../../functions/sectorManagement";
import { toast } from "react-toastify";
import { Container } from "../../components/Container";

export const ListSectors = () => {
  const [listSectors, setListSectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function deleteData(id) {
    const newListSectors = listSectors.filter((item) => item.id !== id);
    const response = await deleteSector(id);
    if (response) {
      setListSectors(newListSectors);
      toast.success("Setor excluído com sucesso", {
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
      const data = await getSectors();

      if (data) {
        setListSectors(data);
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
        <ViewSectors sectors={listSectors} deleteSector={deleteData} />
      </Container>
    </LoadingComponent>
  );
};
