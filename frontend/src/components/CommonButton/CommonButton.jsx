export const CommonButton = ({
  content,
  id,
  name,
  colored = true,
  icon,
  onClick,
}) => {
  return (
    <button
      name={name}
      id={id}
      className={`p-2 rounded-md shadow-md transition-all ease-in-out duration-300 hover:shadow-lg ${
        colored
          ? "bg-violet-700 text-white hover:bg-violet-950"
          : "border border-violet-700 text-violet-700 hover:border-0 hover:bg-violet-900 hover:text-white"
      }`}
      onClick={onClick ? onClick : null}
    >
      {icon ? icon : ""}
      {content}
    </button>
  );
};
