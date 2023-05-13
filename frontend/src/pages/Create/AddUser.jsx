import { User } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";

export const AddUser = () => {
  return (
    <div class="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar usuário</h1>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="nameUser">Nome</label>
          <CommonInput id="nameUser" name="nameUser" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="emailUser">Email</label>
          <CommonInput id="emailUser" name="emailUser" type="email" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="passwordUser">Senha</label>
          <CommonInput id="passwordUser" name="passwordUser" type="password" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phoneUser">Telefone</label>
          <CommonInput id="phoneUser" name="phoneUser" type="tel"/>
        </div>
        
        <CommonButton icon={<User size={24}/>} id="btnAddUser"name="btnAddUser" content="Adicionar Usuário"/>
      </form>
    </div>
  );
};
