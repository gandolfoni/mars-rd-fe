import MetricsCard from 'components/common/Card/MetricsCard'
import useAssets from 'hooks/assets/useAssets'
import useLendingMarkets from 'hooks/markets/useLendingMarkets'
import useOverviewData from 'hooks/tokenomics/useOverviewData'
import usePerpsEnabledAssets from 'hooks/assets/usePerpsEnabledAssets'
import useTotalAccounts from 'hooks/accounts/useTotalAccounts'
import { BN } from 'utils/helpers'
import { BN_ZERO } from 'constants/math'
import { ChainInfoID } from 'types/enums'
import { getCurrentChainId } from 'utils/getCurrentChainId'
import { GridGlobe } from 'components/common/Icons'
import { PRICE_ORACLE_DECIMALS } from 'constants/query'
import { useMemo } from 'react'

export default function StatsMetrics() {
  const { data: totalAccounts, isLoading: accountsLoading } = useTotalAccounts()
  const { data: overviewData, isLoading: tvlLoading } = useOverviewData('30')
  const { data: assets, isLoading: assetsLoading } = useAssets()

  const chainId = getCurrentChainId()
  const isNeutron = chainId === ChainInfoID.Neutron1
  const perpsAssets = usePerpsEnabledAssets()
  const markets = useLendingMarkets()

  const latestTvl = useMemo(() => {
    return overviewData?.total_value_locked?.length
      ? overviewData.total_value_locked[0]?.value || 0
      : 0
  }, [overviewData])

  const activeMarkets = useMemo(() => {
    return (
      markets?.filter(
        (market) =>
          !market.asset.isDeprecated &&
          !market.asset.symbol.includes('USDC') &&
          !market.asset.symbol.includes('USDT.kava'),
      ) ?? []
    )
  }, [markets])

  const activeStrategies = useMemo(() => {
    if (!assets) return []
    return isNeutron
      ? assets.filter((asset) => asset.isWhitelisted && asset.denom.includes('share'))
      : assets.filter((asset) => asset.isWhitelisted && asset.denom.includes('gamm'))
  }, [assets, isNeutron])

  const loading = accountsLoading || tvlLoading || assetsLoading

  return (
    <MetricsCard
      hideBackground={false}
      background={
        <div className='absolute right-0 top-0 md:w-180 transform scale-y-[-1]'>
          <GridGlobe />
        </div>
      }
      title='MARS PROTOCOL'
      copy='Explore the Mars Protocol Stats Dashboard to track key performance metrics.'
      isLoading={loading}
      metrics={[
        {
          value: latestTvl ? BN(latestTvl).shiftedBy(-PRICE_ORACLE_DECIMALS) : BN_ZERO,
          label: 'Total Value Locked',
          isCurrency: true,
          formatOptions: {
            maxDecimals: 2,
            minDecimals: 0,
            abbreviated: true,
          },
        },
        {
          value: BN(totalAccounts || 0),
          label: 'Total Amount of Credit Accounts ',
          formatOptions: {
            maxDecimals: 0,
            minDecimals: 0,
          },
        },
        {
          value: BN(activeMarkets?.length || 0),
          label: 'Listed Assets',
          formatOptions: {
            maxDecimals: 0,
            minDecimals: 0,
          },
        },
        {
          value: BN(activeStrategies?.length || 0),
          label: 'Active Strategies',
          formatOptions: {
            maxDecimals: 0,
            minDecimals: 0,
          },
        },
        ...(isNeutron
          ? [
              {
                value: BN(perpsAssets?.length || 0),
                label: 'Active Perps Markets',
                formatOptions: {
                  maxDecimals: 0,
                  minDecimals: 0,
                },
              },
            ]
          : []),
      ]}
      className='w-full gap-5 sm:gap-10 md:gap-18'
      numberClassName='text-2xl md:text-4xl'
    />
  )
}
