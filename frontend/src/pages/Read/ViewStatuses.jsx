import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";

export const ViewStatuses = ({ listStatus, handleRemove }) => {
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
              <div className="flex justify-between gap-3">
                <CommonButton
                  id="btnEditStatus"
                  name="btnEditStatus"
                  content="Editar staus"
                  warn={true}
                  icon={<PencilSimpleLine size={24} />}
                  onClick={() => navigate(`/status/update/${status.id}`)}
                />

                <CommonButton
                  id="btnDeleteStatus"
                  name="btnDeleteStatus"
                  content="Excluir staus"
                  danger={true}
                  icon={<TrashSimple size={24} />}
                  onClick={() => handleRemove(status.id)}
                />
              </div>
              <hr></hr>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
