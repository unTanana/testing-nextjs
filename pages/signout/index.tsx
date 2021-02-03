import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SIGN_OUT } from './mutations';

export default function SignOut() {
  const [signOut] = useMutation(SIGN_OUT);
  const router = useRouter();

  // signout on page load
  useEffect(() => {
    signOut()
      .then(() => {
        router.push('/login');
      })
      .catch(() => {
        router.push('/login');
      });
  }, []);

  return (
    <main>
      <h1> Signing you out ...</h1>
    </main>
  );
}
