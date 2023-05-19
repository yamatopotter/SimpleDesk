import { Circuitry } from "@phosphor-icons/react";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import Select from "react-select";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate, useParams } from "react-router-dom";
import { getEquipment, updateEquipment } from "../../functions/equipmentManagement";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const UpdEquipment = () => {
  const { id } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEquipmenData() {
      const data = await getEquipment(id);
      setValue("name", `${data.name}`);
    }

    getEquipmenData();
  }, []);

  async function handleUpdateEquipment(data) {
    if (updateEquipment(id, data.name, data.idSector, data.idEquipmentType)) {
      setTimeout(() => navigate("/equipment"), 1000);
    }
  }

  return (
    <div class="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Novo Equipamento</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdateEquipment)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="nameEquipment">Nome</label>
          <CommonInput id="nameEquipment" name="nameEquipment" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="selectEquipmentType">Tipo de equipamento</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            name="selectEquipmentType"
            options={mockData}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="selectSector">Setor do equipamento</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            name="selectSector"
            options={mockData}
          />
        </div>

        <CommonButton
          id="btnSaveEquipment"
          name="btnSaveEquipment"
          icon={<Circuitry size={24} />}
          content="Adicionar equipamento"
        />
      </form>
    </div>
  );
};
