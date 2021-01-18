import React from 'react';

import bacLogo from '../../assets/img/basis-share-logo.png';
import basLogo from '../../assets/img/basis-cash-logo.png';
import babLogo from '../../assets/img/basis-bond-logo.png';
import HPTLogo from '../../assets/img/HPT.png';
import HTLogo from '../../assets/img/HT.png';
import sUSDLogo from '../../assets/img/sUSD.png';
import HBTCLogo from '../../assets/img/btc.png';
import USDTLogo from '../../assets/img/usdt.png';
import DOTLogo from '../../assets/img/HDOT.png';
import ETHLogo from '../../assets/img/HETH.png';
import BTCLogo from '../../assets/img/btc1.png';

const logosBySymbol: {[title: string]: string} = {
  'BAC': bacLogo,
  'BAB': babLogo,
  'BAS': basLogo,
  'BXC': bacLogo,
  'BXB': babLogo,
  'BXS': basLogo,
  'HPT': HPTLogo,
  'HT': HTLogo,
  'SUSD': sUSDLogo,
  'USDT(HECO)': USDTLogo,
  'HBTC': HBTCLogo,
  'HDOT': DOTLogo,
  'HETH': ETHLogo,
  'BXC_USDT(HECO)-LP': bacLogo,
  'BXS_USDT(HECO)-LP': basLogo,
    'BTC': BTCLogo
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
