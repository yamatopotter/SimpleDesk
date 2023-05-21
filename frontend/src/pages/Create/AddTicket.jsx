import { Camera, Siren } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonTextarea } from "../../components/CommonTextarea/CommonTextarea";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadPicture } from "../../service/cloudnaryService";
import { addTicket } from "../../functions/ticketManagement";

export const AddTicket = ({ equipmentList }) => {
  const [takePicture, setTakePicture] = useState(false);
  const [picture, setPicture] = useState(null);
  const webcamRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function savePicture(e) {
    e.preventDefault();

    setPicture(webcamRef.current.getScreenshot());
    setTakePicture(false);
  }

  useEffect(()=>setValue("idEquipment", equipmentList[0].value), []);

  const handleAddTicket = async (data) => {
    try {
      if(picture){
        const imageData = await uploadPicture(picture);

        if(imageData){
          if (addTicket(data, imageData.url, 1)) {
            // setTimeout(() => navigate("/tickets"), 1000);
            console.log("criado com imagem");
          }
        }
      }
      else{
        if (addTicket(data, null, 1)) {
          // setTimeout(() => navigate("/tickets"), 1000);
          console.log("criado sem imagem");
        }
      }
    } catch (e) {
      toast.error("Valide os dados inseridos.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-5 w-full">
      <h1 className="text-xl">Abrir chamado</h1>

      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(handleAddTicket)}
      >
        <div className="flex flex-col">
          <label htmlFor="ticketTitle">Título</label>
          <CommonInput
            id="ticketTitle"
            name="ticketTitle"
            extra={{
              ...register("title", { required: "O setor não pode ser vazio" }),
            }}
          />
          {errors?.title?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.title?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="ticketDescription">Descrição</label>
          <CommonTextarea
            id="ticketDescription"
            extra={{
              ...register("description",{}),
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          {picture ? <img src={picture} alt="Foto do chamado" /> : ""}
          {takePicture ? <Webcam ref={webcamRef} /> : ""}
          {takePicture ? (
            <CommonButton
              id="takePicture"
              name="takePicture"
              icon={<Camera size={24} />}
              content="Tirar foto"
              onClick={(e) => {
                savePicture(e);
              }}
            />
          ) : (
            <CommonButton
              id="enableWebcam"
              name="enableWebcam"
              icon={<Camera size={24} />}
              content="Adicionar foto"
              onClick={(e) => {
                e.preventDefault();
                setPicture(null);
                setTakePicture(true);
              }}
              colored={false}
            />
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="selectComputer">Computador</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            name="selectComputer"
            {...register("idEquipment")}
            value={equipmentList[0]}
            onChange={(option) => setValue("idEquipment", option?.value || "")}
            options={equipmentList}
          />
        </div>

        <CommonButton
          id="btnOpenTicket"
          name="btnOpenTicket"
          icon={<Siren size={24} />}
          content="Abrir chamado"
        />
      </form>
    </div>
  );
};
