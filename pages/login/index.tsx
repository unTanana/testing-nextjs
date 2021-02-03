import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useFormik } from 'formik';
import { LOGIN } from './mutations';
import { validationSchema } from './validation';
import { Input } from '@components/common/form';
import { getSession } from '../../lib/auth';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import Link from 'next/link';

const initialFormValues = {
  username: '',
  password: '',
};

export async function getServerSideProps(context: NextPageContext) {
  // redirect to / if the user is logged in!
  const user = getSession(context.req!);
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {}, // Will be passed to the page component as props
  };
}

export default function Login() {
  const [error, setError] = useState('');
  const [login] = useMutation(LOGIN); // returns a function that returns a promise
  const router = useRouter();

  const formik = useFormik({
    validationSchema,
    initialValues: initialFormValues,
    onSubmit: (values, { setSubmitting }) => {
      login({
        variables: {
          username: values.username,
          password: values.password,
        },
      })
        .then(() => {
          setError('');
          setSubmitting(false);
          router.push('/');
        })
        .catch((error) => {
          console.log('error:', error.message);
          setError(error.message);
          setSubmitting(false);
        });
    },
  });

  return (
    <main className="mt-10">
      <h2 className="text-center">Login</h2>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="username" label="Username*" />
        <Input
          formik={formik}
          name="password"
          type="password"
          label="Password*"
        />
        <div className="flex justify-center">
          <button type="submit" className="btn btn-blue">
            Submit
          </button>
        </div>
        {error && <div className="error-text">{error}</div>}
        <div className="pt-4">
          Don't have an account? Feel free to{' '}
          <Link href="/register">
            <a> create </a>
          </Link>{' '}
          one :)
        </div>
      </form>
    </main>
  );
}
