import dotenv from 'dotenv';

dotenv.config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const encodedPassword = encodeURIComponent(dbPassword)

export const dbConnStr = `mongodb+srv://${dbUsername}:${encodedPassword}@cluster0.k7eed4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
