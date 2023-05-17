import { Circuitry } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { addEquipementType } from "../../functions/equipmentTypeManagement";
import { useNavigate } from "react-router-dom";

export const AddEquipmentType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddEquipementType = async (data) => {
    if (addEquipementType(data)) {
      setTimeout(() => navigate("/equipments_type"), 1000);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar tipo de equipamento</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddEquipementType)}
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="equipmentTypeName">Nome</label>
          <CommonInput
            id="equipmentTypeName"
            name="equipmentTypeName"
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
          id="btnAddSector"
          name="btnAddSector"
          content="Salvar tipo de equipamento"
        />
      </form>
    </div>
  );
};
