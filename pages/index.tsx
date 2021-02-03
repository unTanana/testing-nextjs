import { NextPageContext } from 'next';
import { getSession } from '../lib/auth';
import Head from 'next/head';

export async function getServerSideProps(context: NextPageContext) {
  // this is how you make a page private in next apparently
  const user = getSession(context.req!);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
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
      <h1>Le stock Watcher</h1>
    </main>
  );
}
