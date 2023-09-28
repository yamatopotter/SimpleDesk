import { FlowArrow } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addStatus } from "../../functions/statusManagement";
import Select from "react-select";
import { toast } from "react-toastify";

export const AddStatus = ({workflow}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  
  const handleAddStatus = async (data) => {
    const response = await addStatus(data)
    if (response) {
      toast.success("Status adicionado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/status"), 1000);
    }else{
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
      <h1 className="text-xl">Adicionar Status</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddStatus)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="statusName">Nome</label>
          <CommonInput
            id="statusName"
            name="statusName"
            extra={{
              ...register("name", { required: "O status não pode ser vazio" }),
            }}
            className={errors?.name?.message ? "border-red-500" : ""}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="statusName">Workflow</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            name="workflow"
            {...register("workflow", {
              required: "É obrigatório a escolha do workflow",
            })}
            onChange={(option) => setValue("workflow", option?.value || "")}
            options={workflow}
          />
        </div>

        <CommonButton
          icon={<FlowArrow size={24} />}
          id="btnAddStatus"
          name="btnAddStatus"
          content="Salvar status"
        />
      </form>
    </div>
  );
};
