import { useEffect, useState } from "react";
import { ViewStatuses } from "../../pages/Read/ViewStatuses";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { deleteStatus, getStatuses } from "../../functions/statusManagement";
import { toast } from "react-toastify";

export const ListStatuses = () => {
  const [listStatus, setListStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataFromServer() {
      const data = await getStatuses();
      setListStatus(data);
      setIsLoading(false);
    }

    getDataFromServer();
  }, []);

  async function handleRemove(id) {
    const newListStatuses = listStatus.filter((item) => item.id !== id);
    const response = await deleteStatus(id)
    if (response) {
      setListStatus(newListStatuses);
      toast.success("Status excluído com sucesso", {
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
        "Não é possivel excluir porque há informações vinculadas a esse status",
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

  return (
    <LoadingComponent isLoading={isLoading}>
      <ViewStatuses listStatus={listStatus} handleRemove={handleRemove} />
    </LoadingComponent>
  );
};
