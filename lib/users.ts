import pool from './db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import config from './util/config';
import redisClient, { getAsync } from './redis';
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const SALT_ROUNDS = 3;

export async function getAllUsers() {
  console.log('Getting all users!');
  const result = await pool.query(
    'SELECT id, username, description from users ORDER BY id ASC'
  );

  return result.rows;
}

export async function createUser({ username, password }: UserInput) {
  const queryResult = await pool.query(
    `SELECT username from users WHERE username='${username}'`
  );

  console.log('queryResult:', queryResult.rows);
  if (queryResult.rows.length > 0) {
    throw new Error('USER_TAKEN');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  console.log('hashedPassword:', hashedPassword);
  const id = uuidv4();
  console.log('id:', id);

  const insertQueryResult = await pool.query(
    `INSERT into users (id, username, password) VALUES ('${id}', '${username}', '${hashedPassword}')`
  );

  console.log('insertQueryResult:', insertQueryResult);
  const newUserQuery = await pool.query(
    `SELECT id, username from users WHERE id='${id}'`
  );

  console.log('newUserQuery:', newUserQuery.rows);
  return newUserQuery.rows[0];
}

export async function login({
  username,
  password,
}: UserInput): Promise<LoginDetails> {
  const queryResult = await pool.query(
    `SELECT id, password from users WHERE username='${username}'`
  );

  if (queryResult.rows.length === 0) {
    throw new Error('WRONG_CREDENTIALS');
  }

  const user = queryResult.rows[0];

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    throw new Error('WRONG_CREDENTIALS');
  }

  const authToken = jwt.sign(
    {
      id: user.id,
      username,
    },
    config.authSecret,
    { expiresIn: '15s' }
  );
  const refreshToken = jwt.sign(
    {
      id: user.id,
      username,
    },
    config.refreshSecret
  );
  redisClient.set(user.id, refreshToken);
  return {
    authToken,
    refreshToken,
  };
}

export async function deleteUser(userId: string) {
  const queryResult = await pool.query(
    `DELETE from users WHERE id='${userId}'`
  );
  return true && queryResult.rowCount;
}

export async function changePassword({
  userId,
  oldPassword,
  newPassword,
}: ChangePasswordInput) {
  const queryResult = await pool.query(
    `SELECT id, password from users WHERE id='${userId}'`
  );

  if (queryResult.rows.length === 0) {
    throw new Error('WRONG_CREDENTIALS');
  }

  const user = queryResult.rows[0];

  const result = await bcrypt.compare(oldPassword, user.password);
  if (!result) {
    throw new Error('WRONG_CREDENTIALS');
  }

  const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const updateQueryResult = await pool.query(
    `UPDATE users SET password='${newPasswordHash}' WHERE id='${user.id}'`
  );

  return true && updateQueryResult.rowCount;
}

export async function getNewAuthToken(req: NextApiRequest) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('token:', token);
  if (!token) {
    throw new Error('UNAUTHORIZED');
  }
  try {
    const user = jwt.verify(token, config.refreshSecret);
    console.log('user:', user);
    if (!user || !user.id) {
      throw new Error('UNAUTHORIZED');
    }
    const foundRefreshToken = await getAsync(user.id);
    console.log('foundRefreshToken:', foundRefreshToken);

    if (token !== foundRefreshToken) {
      throw new Error('UNAUTHORIZED');
    }

    return jwt.sign(
      { id: user.id, username: user.username },
      config.authSecret,
      { expiresIn: '15s' }
    );
  } catch (e) {
    console.log('e:', e);
    throw new Error('UNAUTHORIZED');
  }
}

interface ChangePasswordInput {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

interface UserInput {
  username: string;
  password: string;
}

interface LoginDetails {
  authToken: string;
  refreshToken: string;
}
