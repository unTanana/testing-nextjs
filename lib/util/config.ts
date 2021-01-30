const config = {
  authSecret: process.env.AUTH_TOKEN_SECRET || 'test',
  refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'test',
};

export default config;
