import { Circuitry } from "@phosphor-icons/react";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import Select from "react-select";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addEquipment } from "../../functions/equipmentManagement";
import { useEffect, useState } from "react";
import { getEquipmentsType } from "../../functions/equipmentTypeManagement";
import { getSectors } from "../../functions/sectorManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const AddEquipment = () => {
  const [equipmentTypeData, setEquipmentTypeData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function transformToOptions(data) {
    const newData = data.map((d) => {
      return { value: d.id, label: d.name };
    });
    return newData;
  }

  useEffect(() => {
    async function getData() {
      const auxEquipmentTypeData = await getEquipmentsType();
      const auxSectorData = await getSectors();

      setEquipmentTypeData(transformToOptions(auxEquipmentTypeData));
      setSectorData(transformToOptions(auxSectorData));
    }

    getData();
    setIsLoading(false);
  }, []);

  

  async function handleAddEquipment(data) {
    if (addEquipment(data)) {
      setTimeout(() => navigate("/equipments"), 1000);
    }
  }

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl">Novo Equipamento</h1>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handleAddEquipment)}
        >
          <div className="flex flex-col gap-2">
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
            {errors?.name?.message && (
              <p className="text-red-500 text-right text-sm">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="selectEquipmentType">Tipo de equipamento</label>
            <Select
              className="basic-single shadow-md"
              classNamePrefix="select"
              isSearchable={true}
              name="selectEquipmentType"
              {...register("idEquipmentType")}
              onChange={(option) =>
                setValue("idEquipmentType", option?.value || "")
              }
              options={equipmentTypeData}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="selectSector">Setor</label>
            <Select
              className="basic-single shadow-md"
              classNamePrefix="select"
              isSearchable={true}
              name="selectSector"
              {...register("idSector")}
              onChange={(option) => setValue("idSector", option?.value || "")}
              options={sectorData}
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
    </LoadingComponent>
  );
};
