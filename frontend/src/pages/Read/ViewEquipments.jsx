import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteEquipment,
  getEquipments,
} from "../../functions/equipmentManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const ViewEquipments = () => {
  const [listEquipments, setListEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function handleRemove(id) {
    const newListEquipments = listEquipments.filter((item) => item.id !== id);
    if (deleteEquipment(id)) {
      setListEquipments(newListEquipments);
      toast.success("Equipamento excluído com sucesso", {
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
        "Não é possivel excluir porque há informações vinculadas a esse equipamento",
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
    async function getEquipmentsList() {
      const data = await getEquipments();
      setListEquipments(data);
      setIsLoading(false);
    }

    getEquipmentsList();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Equipamentos</h1>

          <CommonButton
            id="btnAddEquipment"
            colored={false}
            icon={<Plus size={24} />}
            onClick={() => navigate("/equipment/new")}
          />
        </div>

        <ul>
          {listEquipments.map((equipment) => {
            return (
              <li className="py-3 flex flex-col gap-2" key={equipment.id}>
                <span className="font-bold">#{equipment.id}</span>
                <h2>{equipment.name}</h2>
                <p>{equipment.equipment_type.name}</p>
                <p>{equipment.sector.name}</p>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="btnEditEquipment"
                    name="btnEditEquipment"
                    content="Editar"
                    warn={true}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() =>
                      navigate(`/equipment/update/${equipment.id}`)
                    }
                  />

                  <CommonButton
                    id="btnDeleteEquipment"
                    name="btnDeleteEquipment"
                    content="Excluir"
                    danger={true}
                    icon={<TrashSimple size={24} />}
                    onClick={() => {
                      handleRemove(equipment.id);
                    }}
                  />
                </div>
                <hr></hr>
              </li>
            );
          })}
        </ul>
      </div>
    </LoadingComponent>
  );
};
