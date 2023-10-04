import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "../../components/ModalDelete";
import { useState } from "react";

export const ViewStatuses = ({ listStatus, handleRemove }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Status</h1>
        <CommonButton
          id="btn_addStatus"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/status/new")}
        />
      </div>

      <ul>
        {listStatus.map((status) => {
          return (
            <li className="py-3 flex flex-col gap-3" key={status.id}>
              <span className="font-bold">#{status.id}</span>
              <h2>{status.name}</h2>
              <p
                className={`p-1 text-white w-20 text-center rounded-md ${
                  status.workflow.id === 1
                    ? "bg-red-500"
                    : status.workflow.id === 2
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {status.workflow.name === "doing"
                  ? "Fazendo"
                  : status.workflow.name === "done"
                  ? "Feito"
                  : "A fazer"}
              </p>
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btnEditStatus"
                  name="btnEditStatus"
                  content="Editar status"
                  warn={true}
                  full={true}
                  showTextOnMobile={false}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/status/update/${status.id}`)}
                />

                <CommonButton
                  id="btnDeleteStatus"
                  name="btnDeleteStatus"
                  content="Excluir status"
                  danger={true}
                  full={true}
                  showTextOnMobile={false}
                  icon={<TrashSimple size={24} />}
                  onClick={() =>
                    setIsVisible({
                      visible: true,
                      id: status.id,
                      name: status.name,
                    })
                  }
                />
              </div>
              <hr></hr>
            </li>
          );
        })}
      </ul>

      <ModalDelete
        isVisible={isVisible.visible}
        setIsVisible={setIsVisible}
        idEntity={isVisible.id}
        nameEntity={isVisible.name}
        onClickYes={() => handleRemove(isVisible.id)}
      />
    </div>
  );
};
