export const ModalDelete = ({
  idEntity,
  nameEntity,
  onClickYes,
  isVisible,
  setIsVisible,
}) => {
  function close() {
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed flex inset-0 bg-black bg-opacity-20 backdrop-blur-sm h-full w-full justify-center items-center"
      id={`modal-${idEntity}`}
      onClick={close}
    >
      <div className="relative flex flex-col bg-slate-50 p-5 rounded-md m-4 shadow-lg">
        <h1 className="text-lg text-center">
          Tem certeza que deseja remover{" "}
          <span className="text-red-600">{nameEntity}</span>?
        </h1>

        <div className="flex mt-5 gap-5">
          <button
            className="w-full bg-green-700 p-2 rounded-md text-slate-50 shadow-md"
            onClick={onClickYes}
          >
            Sim
          </button>

          <button
            className="w-full bg-red-700 p-2 rounded-md text-slate-50 shadow-md"
            onClick={close}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};
