export const CommonButton = ({
  content,
  id,
  name,
  colored = true,
  icon,
  onClick,
  warn = false,
  danger = false,
  full = false,
  showTextOnMobile = true
}) => {
  return (
    <button
      name={name}
      id={id}
      className={`flex gap-2 justify-center p-2 rounded-md shadow-md transition-all ease-in-out duration-300 hover:shadow-lg ${
        colored
          ? warn
            ? "bg-amber-600 text-white hover:bg-amber-700"
            : danger
            ? "bg-red-600 text-white hover:bg-red-800"
            : "bg-violet-700 text-white hover:bg-violet-950"
          : "border border-violet-700 text-violet-700 hover:bg-violet-900 hover:text-white"
      } ${full ? "w-full" : ""}`}
      onClick={onClick ? onClick : null}
    >
      {icon ? icon : ""}
      {content ? <span className={showTextOnMobile ? "" : "hidden md:block"}>{content}</span> : null}
    </button>
  );
};
