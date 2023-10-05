import { useForm } from "react-hook-form";
// Phone
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

// Password Validation
import { useEffect, useState } from "react";
import { CommonInput } from "../../components/CommonInput/CommonInput";
import Select from "react-select";
import { CommonButton } from "../../components/CommonButton/CommonButton";
import { User } from "@phosphor-icons/react";
import { updateUser } from "../../functions/userManagement";

export const UpdUser = ({ user }) => {
  const [onLoadState, setOnLoadState] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const validatePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Número inválido. Inseriu o código do país ou selecionou ao lado o país?";
    }
    return true;
  };

  useEffect(() => {
    setValue("id", user.id);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("role", user.role);
  }, []);

  const updateData = async (data) => {
    setOnLoadState(true);

    const response = await updateUser(data);
    if (response) {
      if (id) {
        setTimeout(navigate("/user"), 1000);
        return;
      } else {
        updateLiveUserData(response, setUserData);
        setTimeout(navigate("/about"), 1000);
        return;
      }
    }

    setOnLoadState(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Modificar usuário</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(updateData)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="in_name">Nome</label>
          <CommonInput
            id="in_name"
            name="in_name"
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
          <label htmlFor="in_email">Email</label>
          <CommonInput
            id="in_email"
            name="in_email"
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

        {user.role === "ADMIN" && (
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
              defaultValue={
                user.role === "USER"
                  ? { value: "USER", label: "Usuário" }
                  : {
                      value: "ADMIN",
                      label: "Administrador",
                    }
              }
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
        )}

        <CommonButton
          icon={<User size={24} />}
          id="btn_updateUser"
          name="btn_updateUser"
          content="Atualizar Usuário"
        />
      </form>
    </div>
  );
};
