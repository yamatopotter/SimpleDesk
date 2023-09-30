import { UsersFour } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { addSector } from "../../functions/sectorManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddSector = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddSector = async (data) => {
    const response = await addSector(data)
    if (response) {
      toast.success("Setor adicionado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=>navigate("/sector"), 1000);
    }
    else{
      toast.error("Valide os dados inseridos.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
        />
      </form>
    </div>
  );
};
