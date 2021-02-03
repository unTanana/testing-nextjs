export default function Input({
  type = 'text',
  name,
  label,
  formik,
}: InputProps) {
  const hasError = formik.errors[name] && formik.touched[name];

  return (
    <div className="flex flex-col">
      {label ? (
        <label className="w-full text-left text-sm pb-1" htmlFor="username">
          {label}
        </label>
      ) : null}
      <input
        className={hasError ? 'border-red-700' : ''}
        id={name}
        type={type}
        disabled={formik.isSubmitting}
        {...formik.getFieldProps(name)}
      />
      {hasError ? (
        <div className="text-red-700 text-center text-sm pt-1">
          {formik.errors[name]}
        </div>
      ) : null}
    </div>
  );
}

interface InputProps {
  type?: string;
  label?: string;
  name: string;
  formik: any;
}
