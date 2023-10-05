import { Circuitry } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { addEquipementType } from "../../functions/equipmentTypeManagement";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AddEquipmentType = () => {
  const [onLoadState, setOnLoadState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const saveData = async (data) => {
    setOnLoadState(true);
    const response = await addEquipementType(data);
    if (response) {
      setTimeout(navigate("/equipment_type"), 1000);
      return;
    }

    setOnLoadState(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar tipo de equipamento</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(saveData)}>
        <div className="flex flex-col gap-5">
          <label htmlFor="in_equipmentTypeName">Nome</label>
          <CommonInput
            id="in_equipmentTypeName"
            name="in_equipmentTypeName"
            extra={{
              ...register("name", { required: "O setor não pode ser vazio" }),
            }}
            className={errors?.name?.message ? "border-red-500" : ""}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<Circuitry size={24} />}
          id="btn_addEquipmentType"
          name="btn_addEquipmentType"
          content="Salvar tipo de equipamento"
          onLoadState={onLoadState}
        />
      </form>
    </div>
  );
};
