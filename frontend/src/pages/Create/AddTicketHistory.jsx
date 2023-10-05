import { Camera, Siren } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonTextarea } from "../../components/CommonTextarea/CommonTextarea";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { uploadPicture } from "../../service/cloudnaryService";
import { addTicketHistory } from "../../functions/ticketHistoryManagement";

export const AddTicketHistory = ({ statuses, ticket }) => {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";

  const [takePicture, setTakePicture] = useState(false);
  const [picture, setPicture] = useState(null);
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);
  const webcamRef = useRef(null);

  const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT,
  };

  const changeCamera = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

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

  useEffect(() => setValue("idTicket", ticket), []);

  const saveData = async (data) => {
    if (picture) {
      const imageData = await uploadPicture(picture);

      if (imageData) {
        const response = await addTicketHistory(data, imageData.url);
        if (response) {
          setTimeout(() => navigate("/home"), 1000);
        }
      }
    } else {
      const response = await addTicketHistory(data, null);
      if (response) {
        setTimeout(() => navigate("/home"), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-5 w-full">
      <h1 className="text-xl">Atualizar chamado</h1>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit(saveData)}>
        <div className="flex flex-col">
          <label htmlFor="ticketDescription">Descrição</label>
          <CommonTextarea
            id="ticketDescription"
            name="ticketDescription"
            extra={{
              ...register("description", {
                required: "A comunicação requer uma descrição",
              }),
            }}
          />
          {errors?.description?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.description?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {picture ? <img src={picture} alt="Foto do chamado" /> : ""}
          {takePicture ? (
            <>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  ...videoConstraints,
                  facingMode,
                }}
              />
              <span
                onClick={changeCamera}
                className="absolute top-2 right-2 rounded-full shadow-md hover:shadow-lg bg-purple-500 text-white p-2"
              >
                <CameraRotate size={24} />
              </span>
            </>
          ) : (
            ""
          )}
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
          <label htmlFor="select_status">Status da atualização</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            name="select_status"
            {...register("status", {
              required: "É obrigatório a escolha do equipamento",
            })}
            onChange={(option) => setValue("status", option?.value || "")}
            options={statuses}
          />
        </div>

        <CommonButton
          id="btnOpenTicket"
          name="btnOpenTicket"
          icon={<Siren size={24} />}
          content="Atualizar chamado"
        />
      </form>
    </div>
  );
};
