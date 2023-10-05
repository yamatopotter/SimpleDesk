import { UsersFour } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { addSector } from "../../functions/sectorManagement";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AddSector = () => {
  const [onLoadState, setOnLoadState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddSector = async (data) => {
    setOnLoadState(true);
    const response = await addSector(data);
    if (response) {
      setTimeout(() => navigate("/sector"), 1000);
      return;
    }

    setOnLoadState(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar Setor</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddSector)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="in_sectorName">Nome</label>
          <CommonInput
            id="in_sectorName"
            name="in_sectorName"
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
          id="btn_addSector"
          name="btn_addSector"
          content="Salvar setor"
          onLoadState={onLoadState}
        />
      </form>
    </div>
  );
};
