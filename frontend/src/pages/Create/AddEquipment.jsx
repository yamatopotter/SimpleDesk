import { Circuitry } from "@phosphor-icons/react";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import Select from "react-select";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addEquipment } from "../../functions/equipmentManagement";
import { toast } from "react-toastify";

export const AddEquipment = ({ equipmentType, sector }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const saveData = async (data) => {
    const response = await addEquipment(data);
    if (response) {
      setTimeout(navigate("/equipment"), 1000);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Novo Equipamento</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(saveData)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nameEquipment">Nome</label>
          <CommonInput
            id="nameEquipment"
            name="nameEquipment"
            extra={{
              ...register("name", {
                required: "O nome do equipamento não pode ser vazio",
              }),
            }}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="select_equipmentType">Tipo de equipamento</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            name="select_equipmentType"
            {...register("idEquipmentType")}
            onChange={(option) =>
              setValue("idEquipmentType", option?.value || "")
            }
            options={equipmentType}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="select_Sector">Setor</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            name="select_Sector"
            {...register("idSector", {
              required: "É obrigatório a escolha do setor",
            })}
            onChange={(option) => setValue("idSector", option?.value || "")}
            options={sector}
          />
        </div>

        <CommonButton
          id="btn_saveEquipment"
          name="btn_saveEquipment"
          icon={<Circuitry size={24} />}
          content="Adicionar equipamento"
        />
      </form>
    </div>
  );
};
