export const ListItemBoxed = ({ title, description, started }) => {
  return (
    <li className="flex flex-col gap-1 justify-between">
      <p className="text-violet-700">{title}</p>
      <span
        className={`rounded-full ${
          started ? "bg-orange-100" : "bg-red-100"
        } text-sm text-center p-1`}
      >
        {description}
      </span>
    </li>
  );
};
