import { DesktopTower } from "@phosphor-icons/react";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import Select from "react-select";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateEquipment } from "../../functions/equipmentManagement";

export const UpdEquipment = ({
  equipment,
  listSector,
  listEquipmentsType,
  navigate,
}) => {
  const [onLoadState, setOnLoadState] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("id", equipment.id);
    setValue("name", equipment.name);
    setValue("idEquipmentType", equipment.equipment_type.id);
    setValue("idSector", equipment.sector.id);
  }, []);

  function transformToDefaultOption(value, label) {
    return { value: value, label: label };
  }

  const updateData = async (data) => {
    setOnLoadState(true);

    const response = await updateEquipment(data);
    if (response) {
      setTimeout(navigate("/equipment"), 1000);
      return;
    }

    setOnLoadState(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualização do Equipamento</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(updateData)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="nameEquipment">Nome</label>
          <CommonInput
            id="nameEquipment"
            name="nameEquipment"
            extra={{
              ...register("name", {
                required: "O nome do equipamento não pode ser vazio",
              }),
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="selectEquipmentType">Tipo de equipamento</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            name="selectEquipmentType"
            {...register("idEquipmentType")}
            defaultValue={transformToDefaultOption(
              equipment?.equipment_type?.id,
              equipment?.equipment_type?.name
            )}
            onChange={(option) =>
              setValue("idEquipmentType", option?.value || "")
            }
            options={listEquipmentsType}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="selectSector">Setor do equipamento</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            name="selectSector"
            {...register("idSector")}
            value={transformToDefaultOption(
              equipment?.sector?.id,
              equipment?.sector?.name
            )}
            onChange={(option) => setValue("idSector", option?.value || "")}
            options={listSector}
          />
        </div>

        <CommonButton
          id="btn_updateEquipment"
          name="btn_updateEquipment"
          icon={<DesktopTower size={24} />}
          content="Atualizar equipamento"
          onLoadState={onLoadState}
        />
      </form>
    </div>
  );
};
