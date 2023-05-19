import { FlowArrow } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addStatus } from "../../functions/statusManagement";

export const AddStatus = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddStatus = async (data) => {
    if (addStatus(data)) {
      setTimeout(() => navigate("/statuses"), 1000);
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

        <CommonButton
          icon={<FlowArrow size={24} />}
          id="btnAddStatus"
          name="btnAddStatus"
          content="Salvar setor"
        />
      </form>
    </div>
  );
};
