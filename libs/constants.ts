require('dotenv').config()
export const jwtConstants = {
  secret: process.env.SECRET,
  refresh_secret: process.env.REFRESH_SECRET
};

