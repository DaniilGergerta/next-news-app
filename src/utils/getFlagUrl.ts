import { FLAG_API_BASE_URL } from '@/common/constants';

export const getFlagUrl = (countryCode: string, size: number) =>
  FLAG_API_BASE_URL.replace('%c%', countryCode).replace('%s%', String(size));
