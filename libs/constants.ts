require('dotenv').config()
export const jwtConstants = {
  access_secret: process.env.SECRET ? process.env.SECRET : "secret",
  refresh_secret: process.env.refresh_secret ? process.env.refresh_secret : "secret_refresh"
};

