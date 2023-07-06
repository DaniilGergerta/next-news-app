import axios from 'axios';
import { NEW_API_BASE_URL } from '@/common/constants';
import { NEWS_API_KEY } from '@/common/config';

export const instance = axios.create({
  baseURL: NEW_API_BASE_URL,
  headers: {
    Authorization: `d042004c82c849199bde112a50e48c0c`,
  },
});
