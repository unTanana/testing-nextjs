import { NextPageContext } from 'next';
import { getSession } from '../lib/auth';
import Router from 'next/router';
import Head from 'next/head';

export async function getServerSideProps(context: NextPageContext) {
  const user = getSession(context.req!);
  console.log('user:', user);

  if (!user) {
    if (context.res) {
      console.log('redirecting the bastard!');
      context.res?.writeHead(302, {
        Location: '/login',
      });
      context.res?.end();
    } else {
      Router.replace('/login');
    }
  }
  return {
    props: {}, // Will be passed to the page component as props
  };
}

export default function Home() {
  return (
    <main>
      <Head>
        <title>Le Stock Watcher</title>
      </Head>
      Le stock Watcher
    </main>
  );
}
