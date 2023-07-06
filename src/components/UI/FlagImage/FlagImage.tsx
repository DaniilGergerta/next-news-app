import { TCountryCode, TFlagApiSupportedSizes } from '@/common/types';
import Image from 'next/image';
import { getFlagUrl } from '@/utils/getFlagUrl';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/common/constants';

interface Props {
  countryCode: TCountryCode;
  size: TFlagApiSupportedSizes;
}

const FlagImage = ({ countryCode, size }: Props) => (
  <Image
    loading="lazy"
    src={getFlagUrl(COUNTRY_CODES.includes(countryCode) ? countryCode : DEFAULT_COUNTRY_CODE, size)}
    alt={`${countryCode} flag`}
    width={size}
    height={size}
  />
);
export default FlagImage;
