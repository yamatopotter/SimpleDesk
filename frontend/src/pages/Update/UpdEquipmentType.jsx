import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { UsersFour } from "@phosphor-icons/react";
import { getEquipmentType, updateEquipmentType } from "../../functions/equipmentTypeManagement";

export const UpdEquipmentType = () => {
  const { id } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEquipmentTypeName() {
      const data = await getEquipmentType(id);
      setValue("name", `${data.name}`);
    }

    getEquipmentTypeName();
  }, []);

  async function handleUpdateEquipmentType(data) {
    if (updateEquipmentType(data.name, id)) {
      setTimeout(() => navigate("/equipments_type"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualizar tipo de equipamento</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdateEquipmentType)}
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="equipmentTypeName">Nome</label>
          <CommonInput
            id="equipmentTypeName"
            extra={{
              ...register("name", { required: "O tipo de equipamento não pode ser vazio",
              maxLength:{
                value:20,
                message: "O tipo não pode ter mais de 20 caracteres"
              }
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
        />
      </form>
    </div>
  );
};
