import { gql, useMutation } from '@apollo/client';
import { SyntheticEvent, useState } from 'react';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      authToken
      refreshToken
    }
  }
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login] = useMutation(LOGIN);

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(username, password);

    login({
      variables: {
        username,
        password,
      },
    })
      .then((res) => {
        setError('');
        const { authToken, refreshToken } = res.data.login;
        console.log('authToken:', authToken);
        console.log('refreshToken:', refreshToken);
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch((error) => {
        console.log('error:', error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <main>
        <form>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={submitForm}>Submit</button>
          {error && <div>{error}</div>}
        </form>
      </main>
    </div>
  );
}

export function getstaticProps() {}
