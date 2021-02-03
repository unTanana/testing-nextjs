import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { validationSchema } from './validation';
import { REGISTER } from './mutations';
import { Input } from '../../components/form';

const initialFormValues = {
  username: '',
  password: '',
  rePassword: '',
};

export default function Register() {
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    validationSchema,
    initialValues: initialFormValues,
    onSubmit: (values, { setSubmitting }) => {
      register({
        variables: {
          username: values.username,
          password: values.password,
        },
      }).then(() => {
        setSubmitting(false);
      });
    },
  });

  return (
    <main className="mt-10">
      <h2 className="text-center">Register</h2>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="username" label="Username*" />

        <Input
          formik={formik}
          name="password"
          type="password"
          label="Password*"
        />

        <Input
          formik={formik}
          name="rePassword"
          type="password"
          label="Confirm Password*"
        />

        <div className="flex flex-row justify-center">
          <button
            className="btn btn-blue"
            disabled={formik.isSubmitting}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
