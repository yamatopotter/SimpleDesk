import { Camera, Siren } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonTextarea } from "../../components/CommonTextarea/CommonTextarea";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import Select from "react-select";

export const AddTicketHistory = () => {
  const [takePicture, setTakePicture] = useState(false);
  const [picture, setPicture] = useState(null);
  const webcamRef = useRef(null);
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

  function savePicture(e) {
    e.preventDefault();

    setPicture(webcamRef.current.getScreenshot());
    setTakePicture(false);
  }

  return (
    <div className="flex flex-col flex-1 gap-5 w-full">
      <h1 className="text-xl">Atualizar chamado</h1>

      <form className="flex flex-col gap-8">
        <div className="flex flex-col">
          <label htmlFor="ticketDescription">Descrição</label>
          <CommonTextarea id="ticketDescription" name="ticketDescription" />
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
          <label htmlFor="selectComputer">Status da atualização</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isSearchable={true}
            name="selectComputer"
            options={mockData}
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
