import { User } from "@phosphor-icons/react";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import { useForm } from "react-hook-form";
import { registerUser } from "../../functions/auth";
import Select from "react-select";
// Phone
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

// Password Validation
import validator from "validator";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

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

  const saveData = async (data) => {
    const response = await registerUser(data);
    if (response) {
      toast.success("Usuário registrado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(navigate("/user"), 1000);
    } else {
      toast.error(
        "Falha ao adicionar o usuário, verifique se todas as informações foram preenchidas",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Invalid phone number";
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Adicionar usuário</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(saveData)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nameUser">Nome</label>
          <CommonInput
            id="nameUser"
            name="nameUser"
            extra={{
              ...register("name", {
                required: "O nome não pode ser vazio",
                maxLength: 30,
              }),
            }}
            className={errors?.name?.message ? "border-red-500" : ""}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="emailUser">Email</label>
          <CommonInput
            id="emailUser"
            name="emailUser"
            type="email"
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

        <div className="flex flex-col gap-2">
          <label htmlFor="in_phone">Telefone</label>
          <PhoneInputWithCountry
            name="phone"
            id="in_phone"
            control={control}
            className={`border rounded-md p-2 shadow-md ${
              errors?.phone?.message ? "border-red-500" : ""
            }`}
            rules={{
              required: "Telefone não pode ser vazio",
              validate: validatePhoneNumber,
            }}
          />
          {errors?.phone?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.phone?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="in_role">Nível de acesso</label>
          <Select
            className="basic-single shadow-md"
            classNamePrefix="select"
            isMulti={false}
            isSearchable={false}
            name="in_role"
            {...register("role")}
            onChange={(option) => setValue("role", option?.value || "")}
            defaultValue={{ value: "USER", label: "Usuário" }}
            options={[
              { value: "USER", label: "Usuário" },
              {
                value: "ADMIN",
                label: "Administrador",
              },
            ]}
          />
          {errors?.role?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.role?.message}
            </p>
          )}
        </div>

        <CommonButton
          icon={<User size={24} />}
          id="btnAddUser"
          name="btnAddUser"
          content="Adicionar Usuário"
        />
      </form>
    </div>
  );
};
