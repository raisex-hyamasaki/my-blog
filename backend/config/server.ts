import fs from 'fs';
import path from 'path';

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  https: {
    key: fs.readFileSync(path.resolve(__dirname, '../../ssl/strapi/strapi-selfsigned.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../../ssl/strapi/strapi-selfsigned.crt')),
  },
});