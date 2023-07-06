import { TCountryCode, TFlagApiSupportedSizes } from '@/common/types';
import Image from 'next/image';
import { getFlagUrl } from '@/utils/getFlagUrl';

interface Props {
  countryCode: TCountryCode;
  size: TFlagApiSupportedSizes;
}

const FlagImage = ({ countryCode, size }: Props) => (
  <Image src={getFlagUrl(countryCode, size)} alt={`${countryCode} flag`} width={size} height={size} />
);
export default FlagImage;
