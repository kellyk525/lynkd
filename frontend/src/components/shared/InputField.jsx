const InputField = ({
  required = false,
  type = "text",
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="border border-base-300 py-2 px-2.5 text-sm w-full rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
      {...rest}
    />
  );
};

export default InputField;
