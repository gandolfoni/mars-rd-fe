import LiquidationsMetrics from 'components/main/Liquidations/Table/LiquidationsMetrics'
import LiquidationsTable from 'components/main/Liquidations/Table/LiquidationsTable'
import useChainConfig from 'hooks/chain/useChainConfig'
import Text from 'components/common/Text'
import { ChainInfoID } from 'types/enums'

export default function LiquidationsPage() {
  const chainConfig = useChainConfig()
  const isNeutron = chainConfig.id === ChainInfoID.Neutron1

  return (
    <div className='w-full'>
      {isNeutron ? (
        <div className='flex justify-center items-center h-full'>
          <Text size='2xl'>Please switch to the Osmosis chain to see available data.</Text>
        </div>
      ) : (
        <>
          <LiquidationsMetrics />
          <LiquidationsTable />
        </>
      )}
    </div>
  )
}
