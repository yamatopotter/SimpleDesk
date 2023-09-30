import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { UsersFour } from "@phosphor-icons/react";

export const UpdSector = ({ sector, updateSector }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", `${sector.name}`);
    setValue("id", `${sector.id}`);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualizar Setor</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(updateSector)}
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="sectorName">Nome</label>
          <CommonInput
            id="sectorName"
            extra={{
              ...register("name", { required: "O setor não pode ser vazio" }),
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
          content="Atualizar setor"
        />
      </form>
    </div>
  );
};
