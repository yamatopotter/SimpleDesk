import { useForm } from "react-hook-form";

// Password Validation
import validator from "validator";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { Key } from "@phosphor-icons/react";

export const UpdPassword = ({ updatePassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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


  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Atualização de senha</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(updatePassword)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="passwordUser">Senha</label>
          <CommonInput
            id="passwordUser"
            name="passwordUser"
            type="password"
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
            className={errors?.password?.message ? "border-red-500" : ""}
          />
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
        />
      </form>
    </div>
  );
};
