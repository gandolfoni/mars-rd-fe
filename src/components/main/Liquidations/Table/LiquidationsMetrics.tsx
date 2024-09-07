import MetricsCard from 'components/common/Card/MetricsCard'
import { GridPlanet } from 'components/common/Icons'
import useOverviewData from 'hooks/tokenomics/useOverviewData'
import { BN } from 'utils/helpers'

export default function LiquidationsMetrics() {
  const { data: liquidityOverviewData, isLoading: isLiquidityOverviewDataLoading } =
    useOverviewData()

  const badDebt = liquidityOverviewData?.data[0].bad_debt
  const walletsForLiquidation = liquidityOverviewData?.data[0].wallets_for_liquidation
  const walletsAtRisk = liquidityOverviewData?.data[0].wallets_at_risk
  const valueForLiquidation = liquidityOverviewData?.data[0].value_eligible_for_liquidation

  const liquidationMetrics: Metric[] = [
    {
      value: BN(badDebt),
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
      value: BN(walletsForLiquidation),
      label: 'Wallets For Liquidation',
      formatOptions: {
        maxDecimals: 0,
        minDecimals: 0,
      },
      tooltipContent: 'Wallets with Health Factor below 1',
    },
    {
      value: BN(walletsAtRisk),
      label: 'Wallets At Risk',
      formatOptions: {
        maxDecimals: 0,
        minDecimals: 0,
        abbreviated: true,
      },
      tooltipContent: 'Wallets with Health Factor below 1.2',
    },
    {
      value: BN(valueForLiquidation),
      label: 'Value Eligible For Liquidation',
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
        <div className='absolute right-0 top-0 md:w-[500px] transform scale-y-[-1]'>
          <GridPlanet />
        </div>
      }
      title='LIQUIDATION DATA'
      copy='Explore the Mars Protocol Liquidation Dashboard to track performance metrics.'
      metrics={liquidationMetrics}
      isLoading={isLiquidityOverviewDataLoading}
      className='w-full gap-5 sm:gap-10 md:gap-18 sm:p-10 mx-auto'
      numberClassName='text-2xl md:text-5xl'
    />
  )
}
