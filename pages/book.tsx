import { gql, useMutation, useQuery } from '@apollo/client';
import { FC } from 'react';
import { initializeApollo } from '../apollo/client';
const GET_BOOK_DETAILS = gql`
  query {
    book {
      name
      author
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($name: String!, $author: String!) {
    updateBook(name: $name, author: $author) {
      name
      author
    }
  }
`;

const Book: FC = () => {
  const { loading, data, error } = useQuery(GET_BOOK_DETAILS);
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const updateCache = (cache, store) => {
    console.log('store:', store);
    const existingBook = cache.readQuery({
      query: GET_BOOK_DETAILS,
    });

    console.log('existingBook:', existingBook);
    cache.writeQuery({
      query: GET_BOOK_DETAILS,
      data: { book: store.data.updateBook },
    });
  };

  const [updateBook] = useMutation(UPDATE_BOOK, { update: updateCache });
  const updateBookHandler = () => {
    console.log('blabla');
    updateBook({
      variables: { name: 'A Spicy Sausage', author: 'Anton the Butcher' },
    });
  };

  return (
    <div>
      {JSON.stringify(data, null, 3)}
      <button onClick={updateBookHandler}> Update Book </button>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_BOOK_DETAILS,
  });

  return {
    props: {
      initialState: apolloClient.cache.extract(),
    },
  };
}

export default Book;
