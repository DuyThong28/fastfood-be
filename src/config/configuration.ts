import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  env: process.env.NODE_ENV || 'DEVELOPMENT',
});
