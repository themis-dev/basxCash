import React from 'react';

import bacLogo from '../../assets/img/basis-cash-logo.png';
import basLogo from '../../assets/img/basis-share-logo.png';
import babLogo from '../../assets/img/basis-bond-logo.png';
import yCRVLogo from '../../assets/img/ycrv.png';
import HTLogo from '../../assets/img/HT.png';
import sUSDLogo from '../../assets/img/sUSD.png';
import HUSDLogo from '../../assets/img/HUSD.png';
import USDTLogo from '../../assets/img/USDT.png';

const logosBySymbol: {[title: string]: string} = {
  'BAC': bacLogo,
  'BAB': babLogo,
  'BAS': basLogo,
  'HPT': yCRVLogo,
  'HT': HTLogo,
  'SUSD': sUSDLogo,
  'HUSD': HUSDLogo,
  'HBTC': USDTLogo,
  'BAC_HUSD-LPv2': bacLogo,
  'BAS_HUSD-LPv2': basLogo,
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
  }
  return (
    <img
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  )
};

export default TokenSymbol;
