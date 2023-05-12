import { FlowArrow } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";

export const AddStatus = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar Status</h1>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="statusName">Nome</label>
          <CommonInput id="statusName" name="sectorName" />
        </div>

        <CommonButton icon={<FlowArrow size={24} />} content="Salvar status" />
      </form>
    </div>
  );
};
