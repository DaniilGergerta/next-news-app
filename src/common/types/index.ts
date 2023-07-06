import { COUNTRY_CODES } from '@/common/constants';

export type TKeyOfArray<T extends string[]> = T[number];
export type TCountryCode = TKeyOfArray<typeof COUNTRY_CODES>;
export type TFlagApiSupportedSizes = 16 | 24 | 32 | 48 | 64;
