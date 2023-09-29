export const UpdUser = ({user}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function updateData(data){
    
  }


  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-xl">Modificar usuário</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(updateData)}
      >
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
          <label htmlFor="phoneUser">Telefone</label>
          <CommonInput
            id="phoneUser"
            name="phoneUser"
            type="tel"
            minLength="10"
            maxLength="11"
            extra={{
              ...register("phone", {
                required: "o telefone não pode ser vazio",
                pattern: {
                  value: /^[0-9]{10,11}$/i,
                  message: "O telefone deve conter entre 10 e 11 digitos",
                },
              }),
            }}
            className={errors?.phone?.message ? "border-red-500" : ""}
          />
          {errors?.phone?.message && (
            <p className="text-red-500 text-right text-sm">
              {errors.phone?.message}
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
