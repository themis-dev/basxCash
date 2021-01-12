import { ChainId } from 'medxswap-sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 128,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://http-mainnet.hecochain.com',
    deployments: require('./basis-cash/deployments/deployments.local.json'),
    externalTokens: {
      DAI: ['0x0298c2b32eae4da002a15f36fdf7615bea3da047', 8],
      HT: ['0x0000000000000000000000000000000000000000', 18], //HT
      HBTC: ['0x66a79d23e58475d2738179ca52cd0b41d73f0bea', 18],
      HPT: ['0xe499ef4616993730ced0f31fa2703b92b50bb536', 18],
      HUSD: ['0x0298c2b32eae4da002a15f36fdf7615bea3da047', 8], // HUSD
      'BAC_HUSD-LPv2': ['0xae25E74c4f72e3BB01c46BEF924C762af8430838', 18],
      'BAS_HUSD-LPv2': ['0xb056Ef437f5CCd3373c5A1d61FCFCA787a730e60', 18],
    },
    baseLaunchDate: new Date('2021-01-07T00:00:00Z'),
    bondLaunchesAt: new Date('2021-01-08T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-10T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://mainnet.infura.io/v3/06ecf536272c43c78adfba29b908a68d',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      'BAC_HUSD-LPv2': ['0xd4405F0704621DBe9d4dEA60E128E0C3b26bddbD', 18],
      'BAS_HUSD-LPv2': ['0x0379dA7a5895D13037B6937b109fA8607a659ADF', 18],
    },
    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  HTCashPool: {
    name: 'Earn BAC by HT',
    contract: 'HTCashPool',
    depositTokenName: 'HT',
    earnTokenName: 'BAC',
    finished: false,
    sort: 3,
  },
  HUSDCashPool: {
    name: 'Earn BAC by HUSD',
    contract: 'HUSDCashPool',
    depositTokenName: 'HUSD',
    earnTokenName: 'BAC',
    finished: false,
    sort: 4,
  },
  HPTCashPool: {
    name: 'Earn BAC by HPT',
    contract: 'HPTCashPool',
    depositTokenName: 'HPT',
    earnTokenName: 'BAC',
    finished: false,
    sort: 5,
  },
  HBTCCashPool: {
    name: 'Earn BAC by HBTC',
    contract: 'HBTCCashPool',
    depositTokenName: 'HBTC',
    earnTokenName: 'BAC',
    finished: false,
    sort: 6,
  },
  // HETHCashPool: {
  //   name: 'Earn BAC by HETH',
  //   contract: 'HETHCashPool',
  //   depositTokenName: 'yCRV',
  //   earnTokenName: 'BAC',
  //   finished: false,
  //   sort: 7,
  // },
  BACLPTokenSharePool: {
    name: 'Earn BAS by BAC-HUSD-LP',
    contract: 'BACLPTokenSharePool',
    depositTokenName: 'BAC_HUSD-LPv2',
    earnTokenName: 'BAS',
    finished: false,
    sort: 1,
  },
  BASLPTokenSharePool: {
    name: 'Earn BAS by BAS-HUSD-LP',
    contract: 'BASLPTokenSharePool',
    depositTokenName: 'BAS_HUSD-LPv2',
    earnTokenName: 'BAS',
    finished: false,
    sort: 2,
  },
};

export default configurations[process.env.NODE_ENV || "development"];
