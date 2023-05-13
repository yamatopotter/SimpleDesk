import { CommonButton } from "../CommonButton/CommonButton";
import { CommonInput } from "../CommonInput/CommonInput";

export const LoginForm = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <CommonInput type="email" id="email" name="email" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Senha</label>
          <CommonInput type="password" id="password" name="password" />
        </div>

        <CommonButton id="btnLogin" name="btnLogin" content="Entrar" />
      </form>
    </div>
  );
};
