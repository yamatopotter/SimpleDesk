import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { UsersFour } from "@phosphor-icons/react";
import { updateEquipmentType } from "../../functions/equipmentTypeManagement";

export const UpdEquipmentType = ({ equipmentType, navigate }) => {
  const [onLoadState, setOnLoadState] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", `${equipmentType.name}`);
    setValue("id", `${equipmentType.id}`);
  }, []);

  const updateData = async (data) => {
    setOnLoadState(true);

    const response = await updateEquipmentType(data);
    if (response) {
      setTimeout(navigate("/equipment_type"), 1000);
      return;
    }

    setOnLoadState(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualizar tipo de equipamento</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(updateData)}
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="equipmentTypeName">Nome</label>
          <CommonInput
            id="equipmentTypeName"
            extra={{
              ...register("name", {
                required: "O tipo de equipamento não pode ser vazio",
                maxLength: {
                  value: 20,
                  message: "O tipo não pode ter mais de 20 caracteres",
                },
              }),
            }}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<UsersFour size={24} />}
          content="Atualizar tipo de equipamento"
          onLoadState={onLoadState}
        />
      </form>
    </div>
  );
};
