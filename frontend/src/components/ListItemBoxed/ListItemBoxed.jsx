export const ListItemBoxed = ({ title, description, started, onClick }) => {
  return (
    <>
      <li
        className="flex flex-col gap-2 justify-between"
        onClick={onClick ? onClick : ""}
      >
        <p className="text-violet-700">{title}</p>
        <span
          className={`rounded-full ${
            started ? "bg-orange-100" : "bg-red-100"
          } text-sm text-center py-1`}
        >
          {description}
        </span>
      </li>
      <hr></hr>
    </>
  );
};
