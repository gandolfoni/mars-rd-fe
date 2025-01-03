import { ActionKind } from 'types/generated/mars-perps/MarsPerps.types'

export const PERPS_DEFAULT_ACTION: { action: ActionKind } = { action: 'default' }

export const PERPS_ASSETS: AstroportAsset[] = [
  {
    chainId: 'neutron-1',
    denom: 'perps/ubtc',
    symbol: 'BTC',
    icon: 'https://raw.githubusercontent.com/mars-protocol/mars-v2-frontend/refs/heads/main/src/components/common/Icons/BTCLogo.svg',
    description: 'Bitcoin',
    decimals: 6,
    priceUSD: 0,
    totalLiquidityUSD: 0,
    dayVolumeUSD: 0,
  },
  {
    chainId: 'neutron-1',
    denom: 'perps/ueth',
    symbol: 'ETH',
    icon: 'https://raw.githubusercontent.com/mars-protocol/mars-v2-frontend/refs/heads/main/src/components/common/Icons/ETHLogo.svg',
    description: 'Ethereum',
    decimals: 6,
    priceUSD: 0,
    totalLiquidityUSD: 0,
    dayVolumeUSD: 0,
  },
  {
    chainId: 'neutron-1',
    denom: 'perps/uatom',
    symbol: 'ATOM',
    icon: 'https://raw.githubusercontent.com/mars-protocol/mars-v2-frontend/refs/heads/main/src/components/common/Icons/ATOMLogo.svg',
    description: 'Cosmos',
    decimals: 6,
    priceUSD: 0,
    totalLiquidityUSD: 0,
    dayVolumeUSD: 0,
  },
  {
    chainId: 'neutron-1',
    denom: 'perps/utia',
    symbol: 'TIA',
    icon: 'https://raw.githubusercontent.com/mars-protocol/mars-v2-frontend/refs/heads/main/src/components/common/Icons/TIALogo.svg',
    description: 'Celestia',
    decimals: 6,
    priceUSD: 0,
    totalLiquidityUSD: 0,
    dayVolumeUSD: 0,
  },
]
