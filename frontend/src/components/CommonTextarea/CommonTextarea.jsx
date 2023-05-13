export const CommonTextarea = ({ id, name, value, onChange }) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value ? value : null}
      onChange = {onChange ? onChange : null}
      className="border rounded-md shadow-md resize-none h-40 p-2"
    ></textarea>
  );
};
