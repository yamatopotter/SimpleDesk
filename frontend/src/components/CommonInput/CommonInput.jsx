export const CommonInput = ({
  type = "text",
  name,
  id,
  value,
  onChange,
  className,
  readOnly = false,
  extra,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      {...value ? `value=${value}` : null}
      className={`border rounded-md p-2 shadow-md transition-all ease duration-300 ${className}`}
      onChange={onChange ? onChange : null}
      readOnly={readOnly}
      {...extra}
    />
  );
};
