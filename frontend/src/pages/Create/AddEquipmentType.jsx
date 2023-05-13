import { Circuitry } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";

export const AddEquipmentType = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar tipo de equipamento</h1>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <label htmlFor="equipmentTypeName">Nome</label>
          <CommonInput id="equipmentTypeName" name="equipmentTypeName" />
        </div>

        <CommonButton
          icon={<Circuitry size={24} />}
          content="Salvar tipo de equipamento"
        />
      </form>
    </div>
  );
};
