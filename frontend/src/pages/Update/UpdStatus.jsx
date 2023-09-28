import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { FlowArrow } from "@phosphor-icons/react";
import { updateStatus } from "../../functions/statusManagement";
import Select from "react-select";
import { toast } from "react-toastify";

export const UpdStatus = ({ status, workflow }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return {
        value: d.id,
        label: d.id == 1 ? "A fazer" : d.id == 2 ? "Fazendo" : "Feito",
      };
    });
    return newData;
  }

  useEffect(() => {
    setValue("id", status.id);
    setValue("name", status.name);
    setValue("workflow", status.workflow.id);
  }, []);

  const navigate = useNavigate();

  async function handleUpdateStatus(data) {
    const response = await updateStatus(data);
    if (response) {
      toast.success("Status atualizado com sucesso", {
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
    } else {
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
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualizar Status</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleUpdateStatus)}
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="in_id">ID</label>
          <CommonInput
            id="in_id"
            extra={{
              ...register("id", { required: "O ID não pode ser vazio" }),
            }}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="in_name">Nome</label>
          <CommonInput
            id="in_name"
            extra={{
              ...register("name", { required: "O status não pode ser vazio" }),
            }}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="select_workflow">Workflow</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={true}
            name="in_workflow"
            {...register("workflow", {
              required: "É obrigatório a escolha do workflow",
            })}
            defaultValue={{
              value: status.workflow.id,
              label:
                status.workflow.id == 1
                  ? "A fazer"
                  : status.workflow.id == 2
                  ? "Fazendo"
                  : "Feito",
            }}
            onChange={(option) => setValue("workflow", option?.value || "")}
            options={transformToOptions(workflow)}
          />
        </div>

        <CommonButton
          icon={<FlowArrow size={24} />}
          content="Atualizar status"
        />
      </form>
    </div>
  );
};
