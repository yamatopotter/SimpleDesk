import { useForm } from "react-hook-form";
import { CommonButton } from "../CommonButton/CommonButton";
import { CommonInput } from "../CommonInput/CommonInput";
import { authUser } from "../../functions/auth";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../provider/AuthenticationProvider";
import { useContext, useEffect, useState } from "react";
import { showToast } from "../../functions/message";

export const LoginForm = () => {
  const [onLoadState, setOnLoadState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, setUserData, setIsAuthenticated } = useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();

  async function authenticateUser(data) {
    setOnLoadState(true);
    const response = await authUser(data, setIsAuthenticated, setUserData);
    if (response) {
      navigate("/home");
      return;
    }
    setOnLoadState(false);
    showToast(response);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

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
                minLength: {
                  value: 8,
                  message: "A senha contém no mínimo 8 caracteres.",
                },
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

        <CommonButton
          id="btnLogin"
          name="btnLogin"
          content="Entrar"
          onLoadState={onLoadState}
        />
      </form>
    </div>
  );
};
