export const LoginForm = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <form className="flex flex-col gap-5 border p-12 backdrop-blur-sm rounded-md">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="p-2 rounded-md border shadow-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            className="p-2 rounded-md border shadow-md"
          />
        </div>

        <button className="bg-violet-900 text-white border-2 border-violet-950 shadow-md hover:shadow-xl p-2 rounded-md">
          Entrar no sistema
        </button>
      </form>
    </div>
  );
};
