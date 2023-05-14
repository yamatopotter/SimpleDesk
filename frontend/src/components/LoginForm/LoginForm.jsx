import { useForm } from "react-hook-form";
import { CommonButton } from "../CommonButton/CommonButton";
import { CommonInput } from "../CommonInput/CommonInput";
import { authUser } from "../../functions/auth";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function authenticateUser(data) {
    authUser(data);
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(authenticateUser)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="inputEmailLogin">Email</label>
          <CommonInput
            type="email"
            id="inputEmailLogin"
            extra={{
              ...register("email", {
                required: "O email não pode ser vazio",
                maxLength: 150,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Insira um e-mail válido",
                },
              }),
            }}
            className={errors?.email?.message ? "border-red-500" : ""}
          />
          {errors?.email?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="inputPasswordLogin">Senha</label>
          <CommonInput
            type="password"
            id="inputPasswordLogin"
            extra={{
              ...register("password", {
                required: "A senha não pode ser vazia",
              }),
            }}
            className={errors?.password?.message ? "border-red-500" : ""}
          />
          {errors?.password?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.password?.message}
            </p>
          )}
        </div>

        <CommonButton id="btnLogin" name="btnLogin" content="Entrar" />
      </form>
    </div>
  );
};
