import { Key, PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "../../components/ModalDelete";
import { useState } from "react";

export const ViewUsers = ({ listUsers, deleteUser }) => {
  const [isVisible, setIsVisible] = useState({
    visible: false,
    id: 0,
  });

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Lista de usuários</h1>
        <CommonButton
          id="btn_addUser"
          colored={false}
          icon={<Plus size={24} />}
          onClick={() => navigate("/user/new")}
        />
      </div>

      <ul className="flex flex-col gap-4">
        {listUsers.map((user) => {
          return (
            <>
              <li className="py-3 flex flex-col gap-2">
                <span className="font-bold">#{user.id}</span>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.role}</p>
                <div className="flex justify-between gap-2">
                  <CommonButton
                    id="btn_editUser"
                    name="btn_editUser"
                    content="Editar"
                    warn={true}
                    full={true}
                    showTextOnMobile={false}
                    icon={<PencilSimpleLine size={24} />}
                    onClick={() => navigate(`/user/update/${user.id}`)}
                  />

                  <CommonButton
                    id="btn_updatePassword"
                    name="btn_updatePassword"
                    content="Trocar senha"
                    full={true}
                    showTextOnMobile={false}
                    icon={<Key size={24} />}
                    onClick={() => navigate(`/user/password/${user.id}`)}
                  />

                  <CommonButton
                    id="btn_deleteUser"
                    name="btn_deleteUser"
                    content="Excluir"
                    danger={true}
                    full={true}
                    showTextOnMobile={false}
                    icon={<TrashSimple size={24} />}
                    onClick={() =>
                      setIsVisible({
                        visible: true,
                        id: user.id,
                        name: user.name,
                      })
                    }
                  />
                </div>
              </li>
              <hr></hr>
            </>
          );
        })}
      </ul>

      <ModalDelete
        isVisible={isVisible.visible}
        setIsVisible={setIsVisible}
        idEntity={isVisible.id}
        nameEntity={isVisible.name}
        onClickYes={() => deleteUser(isVisible.id)}
      />
    </div>
  );
};
