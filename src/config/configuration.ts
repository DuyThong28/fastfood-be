import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  env: process.env.NODE_ENV || 'DEVELOPMENT',
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
});
