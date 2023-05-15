import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSector, updateSector } from "../../functions/sectorManagement";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { UsersFour } from "@phosphor-icons/react";

export const UpdSector = () => {
  const { id } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function getSectorName() {
      const data = await getSector(id);
      setValue("name", `${data.name}`);
    }

    getSectorName();
  }, []);

  async function handleUpdateSector(data) {
    if (updateSector(data.name, id)) {
      setTimeout(()=>navigate("/sectors"), 1000);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualizar Setor</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdateSector)}
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
