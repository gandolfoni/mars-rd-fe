import MetricsCard from 'components/common/Card/MetricsCard'
import { BN } from 'utils/helpers'
import { GridPlanet } from 'components/common/Icons'
import { PRICE_ORACLE_DECIMALS } from 'constants/query'
import useOverviewData from 'hooks/tokenomics/useOverviewData'

export default function LiquidationsMetrics() {
  const { data: liquidityOverviewData, isLoading: isLiquidityOverviewDataLoading } =
    useOverviewData('30')

  const liquidationMetrics: Metric[] = [
    {
      value: BN(liquidityOverviewData?.bad_debt || 0).shiftedBy(-PRICE_ORACLE_DECIMALS),
      label: 'Bad Debt',
      isCurrency: true,
      formatOptions: {
        maxDecimals: 2,
        minDecimals: 0,
        abbreviated: true,
      },
      tooltipContent: 'Borrowings with Collateral Ratio below 1',
    },
    {
      value: BN(liquidityOverviewData?.accounts_for_liquidation || 0),
      label: 'Accounts For Liquidation',
      formatOptions: {
        maxDecimals: 0,
        minDecimals: 0,
      },
      tooltipContent: 'Wallets with Health Factor below 1',
    },
    {
      value: BN(liquidityOverviewData?.accounts_at_risk || 0),
      label: 'Accounts At Risk',
      formatOptions: {
        maxDecimals: 0,
        minDecimals: 0,
        abbreviated: true,
      },
      tooltipContent: 'Wallets with Health Factor below 1.2',
    },
    {
      value: BN(liquidityOverviewData?.value_eligible_for_liquidation || 0).shiftedBy(
        -PRICE_ORACLE_DECIMALS,
      ),
      label: 'Value Eligible For Liquidation',
      isCurrency: true,
      formatOptions: {
        maxDecimals: 2,
        minDecimals: 0,
        abbreviated: true,
      },
    },
    {
      value: BN(liquidityOverviewData?.total_collateral_at_risk || 0).shiftedBy(
        -PRICE_ORACLE_DECIMALS,
      ),
      label: 'Collateral at Risk',
      isCurrency: true,
      formatOptions: {
        maxDecimals: 2,
        minDecimals: 0,
        abbreviated: true,
      },
    },
  ]

  return (
    <MetricsCard
      hideBackground={false}
      background={
        <div className='absolute right-0 top-0 md:w-180'>
          <GridPlanet />
        </div>
      }
      title='LIQUIDATION STATS'
      copy='Explore the Mars Protocol Liquidation Dashboard to track performance metrics.'
      metrics={liquidationMetrics}
      isLoading={isLiquidityOverviewDataLoading}
      className='w-full gap-5 sm:gap-10 md:gap-18 mb-4'
      numberClassName='text-2xl md:text-4xl'
    />
  )
}
