import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { FlowArrow, UsersFour } from "@phosphor-icons/react";
import { getStatus, updateStatus } from "../../functions/statusManagement";

export const UpdStatus = () => {
  const { id } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function getStatusName() {
      const data = await getStatus(id);
      setValue("name", `${data.name}`);
    }

    getStatusName();
  }, []);

  async function handleUpdateStatus(data) {
    if (updateStatus(data.name, id)) {
      setTimeout(() => navigate("/statuses"), 1000);
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
          <label htmlFor="sectorName">Nome</label>
          <CommonInput
            id="statusName"
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

        <CommonButton
          icon={<FlowArrow size={24} />}
          content="Atualizar status"
        />
      </form>
    </div>
  );
};
