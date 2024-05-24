import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CLIENT_KEY = process.env.NEXT_PUBLIC_PORTONE_CLIENT_KEY || '';
export const SECRET_KEY = process.env.NEXT_PUBLIC_PORTONE_SECRET_KEY || '';
export const STORE_ID = process.env.NEXT_PUBLIC_PORTONE_STORE_ID || '';
export const CHANNEL_KEY = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY || '';

