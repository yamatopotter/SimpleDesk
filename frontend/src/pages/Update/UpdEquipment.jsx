import { Circuitry } from "@phosphor-icons/react";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import Select from "react-select";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEquipment,
  updateEquipment,
} from "../../functions/equipmentManagement";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getEquipmentsType } from "../../functions/equipmentTypeManagement";
import { getSectors } from "../../functions/sectorManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const UpdEquipment = () => {
  const { id } = useParams();
  const [equipmentTypeData, setEquipmentTypeData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  function transformToDefaultOption(value, label){
    return { value: value, label: label };
  }

  useEffect(() => {
    async function getEquipmenData() {
      setEquipmentTypeData(transformToOptions(await getEquipmentsType()));
      setSectorData(transformToOptions(await getSectors()));

      const data = await getEquipment(id);

      setEquipmentData(data);

      setValue("name", data.name);
      setValue("idEquipmentType", data.equipment_type.id);
      setValue("idSector", data.sector.id);
      setIsLoading(false)
    }

    getEquipmenData();
  }, []);

  async function handleUpdateEquipment(data) {
    console.log(data)
    if (updateEquipment(id, data)) {
      setTimeout(() => navigate("/equipment"), 1000);
    }
  }

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl">Atualização do Equipamento</h1>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handleUpdateEquipment)}
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
              isSearchable={true}
              name="selectEquipmentType"
              {...register("idEquipmentType")}
              defaultValue={transformToDefaultOption(equipmentData?.equipment_type?.id, equipmentData?.equipment_type?.name)}
              onChange={(option) =>
                setValue("idEquipmentType", option?.value || "")
              }
              options={equipmentTypeData}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="selectSector">Setor do equipamento</label>
            <Select
              className="basic-single shadow-md"
              classNamePrefix="select"
              isSearchable={true}
              name="selectSector"
              {...register("idSector")}
              value={transformToDefaultOption(equipmentData?.sector?.id, equipmentData?.sector?.name)}
              onChange={(option) => setValue("idSector", option?.value || "")}
              options={sectorData}
            />
          </div>

          <CommonButton
            id="btnUpdateEquipment"
            name="btnUpdateEquipment"
            icon={<Circuitry size={24} />}
            content="Atualizar equipamento"
          />
        </form>
      </div>
    </LoadingComponent>
  );
};
