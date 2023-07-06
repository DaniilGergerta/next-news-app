import { ELocalStorageKeys } from '@/common/enums';

export const getLocal = (key: keyof typeof ELocalStorageKeys, defaultValue: string): string =>
  localStorage.getItem(key) ?? defaultValue;
