import 'dotenv/config';

export default {
    secret: process.env.APP_SECRET,
    SALT_KEY: "squad2",
    expiresIn: "7d",
}