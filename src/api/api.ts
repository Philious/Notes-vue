import { colorConsole } from '@/utils/helpers';
import axios from 'axios';

export const backend = axios.create({
  baseURL: `${import.meta.env.VITE_APP_DATABASE_DOMAIN}/${import.meta.env.VITE_APP_BASE_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

colorConsole(`Running: ${import.meta.env.VITE_DATABASE}`, 'hsl(300, 40%, 60%)');