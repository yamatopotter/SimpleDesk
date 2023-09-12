import { FlowArrow } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addStatus } from "../../functions/statusManagement";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getWorkflow } from "../../functions/workflowManagement";

export const AddStatus = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [workflow, setWorkflow] = useState({});

  const handleAddStatus = async (data) => {
    if (await addStatus(data)) {
      setTimeout(() => navigate("/status"), 1000);
    }
  };

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return {
        value: d.id,
        label: d.id == 1 ? "A FAZER" : d.id == 2 ? "FAZENDO" : "FEITO",
      };
    });
    return newData;
  }

  useEffect(() => {
    async function getData() {
      const workflowData = await getWorkflow();

      setWorkflow(transformToOptions(workflowData));
    }

    getData();
  }, []);

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
