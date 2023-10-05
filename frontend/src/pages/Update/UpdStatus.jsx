import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { FlowArrow } from "@phosphor-icons/react";
import { updateStatus } from "../../functions/statusManagement";
import Select from "react-select";

export const UpdStatus = ({ status, workflow, navigate }) => {
  const [onLoadState, setOnLoadState] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("id", status.id);
    setValue("name", status.name);
    setValue("workflow", status.workflow.id);
  }, []);

  async function handleUpdateStatus(data) {
    setOnLoadState(true);

    const response = await updateStatus(data);
    if (response) {
      setTimeout(() => navigate("/status"), 1000);
      return;
    }

    setOnLoadState(false);
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
            options={workflow}
          />
        </div>

        <CommonButton
          icon={<FlowArrow size={24} />}
          content="Atualizar status"
          onLoadState={onLoadState}
        />
      </form>
    </div>
  );
};
