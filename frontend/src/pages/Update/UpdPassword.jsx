import { useForm } from "react-hook-form";

// Password Validation
import validator from "validator";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { Eye, EyeClosed, Key } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../functions/userManagement";

export const UpdPassword = ({ user }) => {
  const [onLoadState, setOnLoadState] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [visiblePassword, setVisiblePassword] = useState(false);

  useEffect(() => {
    setValue("id", user);
  }, []);

  const updatePassword = async (data) => {
    setOnLoadState(true);
    const response = await updateUserPassword(data);

    if (response) {
      setTimeout(navigate("/user"), 1000);
      return;
    }

    setOnLoadState(false);
  };

  const validatePasswordRule = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return true;
    } else {
      return "A senha precisa ter letra maiúscula e minúscula, número e simbolo.";
    }
  };

  const changeVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualização de senha</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(updatePassword)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="passwordUser">Senha</label>
          <div className="flex gap-4">
            <CommonInput
              id="passwordUser"
              name="passwordUser"
              type={visiblePassword ? "text" : "password"}
              extra={{
                ...register("password", {
                  required: "A senha não pode ser vazia",
                  validate: validatePasswordRule,
                  minLength: {
                    value: 8,
                    message: "A senha deve conter no mínimo 8 caracteres",
                  },
                }),
              }}
              className={`w-full ${
                errors?.password?.message ? "border-red-500" : ""
              }`}
            />

            <span
              onClick={(event) => changeVisibility(event)}
              className="flex gap-2 justify-center p-2 rounded-md shadow-md transition-all ease-in-out duration-300 hover:shadow-lg border border-violet-700 text-violet-700"
            >
              {visiblePassword ? <Eye size={24} /> : <EyeClosed size={24} />}
            </span>
          </div>

          {errors?.password?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.password?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<Key size={24} />}
          id="btn_updatePassword"
          name="btnAddbtn_updatePasswordUser"
          content="Atualizar senha"
          onLoadState={onLoadState}
        />
      </form>
    </div>
  );
};
