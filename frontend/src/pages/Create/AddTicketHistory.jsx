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
import { toast } from "react-toastify";

export const AddTicketHistory = ({ statuses, ticket }) => {
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

  useEffect(() => setValue("idTicket", ticket), []);

  const saveData = async (data) => {
    try {
      if (picture) {
        const imageData = await uploadPicture(picture);

        if (imageData) {
          const response = await addTicketHistory(data, imageData.url);
          if (response) {
            toast.success("Status adicionado com sucesso", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => navigate("/home"), 1000);
          } else {
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
        }
      } else {
        const response = await addTicketHistory(data, null);
        if (response) {
          toast.success("Status adicionado com sucesso", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => navigate("/home"), 1000);
        } else {
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
      <h1 className="text-xl">Atualizar chamado</h1>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit(saveData)}>
        <div className="flex flex-col">
          <label htmlFor="ticketDescription">Descrição</label>
          <CommonTextarea
            id="ticketDescription"
            name="ticketDescription"
            extra={{
              ...register("description"),
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
