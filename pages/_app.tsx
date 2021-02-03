import '../styles/global.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { useRouter } from 'next/router';
import { Navigation } from '@components/common/template';
function shouldRenderNavOrFooter(path: string) {
  // don't render nav or footer on login or register paths
  return !(path.includes('/login') || path.includes('/register'));
}

export default function App({ Component, pageProps }) {
  const client = useApollo(pageProps.initialState);
  const router = useRouter();
  const renderNavOrFooter = shouldRenderNavOrFooter(router.pathname);

  return (
    <ApolloProvider client={client}>
      {renderNavOrFooter ? <Navigation /> : null}
      <Component {...pageProps} />
      {renderNavOrFooter ? <footer>Le footer here</footer> : null}
    </ApolloProvider>
  );
}
