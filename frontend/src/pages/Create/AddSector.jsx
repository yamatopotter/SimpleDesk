import { UsersFour } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { addSector } from "../../functions/sectorManagement";
import { useNavigate } from "react-router-dom";

export const AddSector = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddSector = async (data) => {
    if (addSector(data)) {
      setTimeout(()=>navigate("/sectors"), 1000);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar Setor</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddSector)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="sectorName">Nome</label>
          <CommonInput
            id="sectorName"
            name="sectorName"
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
          icon={<UsersFour size={24} />}
          id="btnAddSector"
          name="btnAddSector"
          content="Salvar setor"
        />
      </form>
    </div>
  );
};
