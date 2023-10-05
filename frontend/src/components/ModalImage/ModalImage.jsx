export const ModalImage = ({
  image,
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
      className="fixed flex flex-col inset-0 bg-black bg-opacity-20 backdrop-blur-sm h-full w-full justify-center items-center p-4"
      onClick={close}
    >
       <img src={image} loading="lazy"/>
       <a href={image} className="text-white" target="_blank">Abrir no browser</a>
    </div>
  );
};
