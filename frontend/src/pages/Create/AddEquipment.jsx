import { Circuitry } from "@phosphor-icons/react";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import Select from "react-select";
import { CommonButton } from "../../components/CommonButton/CommonButton";

export const AddEquipment = () => {
  const mockData = [
    {
      value: "teste0",
      label: "teste0",
    },
    {
      value: "teste1",
      label: "teste1",
    },
    {
      value: "teste2",
      label: "teste2",
    },
    {
      value: "teste3",
      label: "teste3",
    },
  ];

  return (
    <div class="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Novo Equipamento</h1>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="nameEquipment">Nome</label>
          <CommonInput id="nameEquipment" name="nameEquipment" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="selectEquipmentType">Tipo de equipamento</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            name="selectEquipmentType"
            options={mockData}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="selectSector">Setor do equipamento</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            name="selectSector"
            options={mockData}
          />
        </div>

        <CommonButton
          id="btnSaveEquipment"
          name="btnSaveEquipment"
          icon={<Circuitry size={24} />}
          content="Adicionar equipamento"
        />
      </form>
    </div>
  );
};
