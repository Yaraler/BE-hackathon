require('dotenv').config();

export default () => ({
  db_url: process.env.DATABASE_URL,
});


