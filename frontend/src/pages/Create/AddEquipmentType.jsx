import { Circuitry } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { addEquipementType } from "../../functions/equipmentTypeManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddEquipmentType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const saveData = async (data) => {
    const response = await addEquipementType(data);
    if (response) {
      toast.success("Tipo de equipamento adicionado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(navigate("/equipment_type"), 1000);
    } else {
      toast.error(
        "Falha ao adicionar o tipo de equipamento, verifique se todas as informações foram preenchidas",
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
        />
      </form>
    </div>
  );
};
