import AssetImage from 'components/common/assets/AssetImage'
import DisplayCurrency from 'components/common/DisplayCurrency'
import Text from 'components/common/Text'
import TitleAndSubCell from 'components/common/TitleAndSubCell'
import useAsset from 'hooks/assets/useAsset'
import { FormattedNumber } from 'components/common/FormattedNumber'
import { BN } from 'utils/helpers'
import { BNCoin } from 'types/classes/BNCoin'
import { BN_ZERO, MIN_AMOUNT } from 'constants/math'
import { demagnify, getCoinValue } from 'utils/formatters'
import { InfoCircle } from 'components/common/Icons'
import { ORACLE_DENOM } from 'constants/oracle'
import { Tooltip } from 'components/common/Tooltip'

interface Props {
  value: BNCoin
  assetData: Asset[]
  historicalPrice?: string
}

export default function Asset(props: Props) {
  const { value, assetData, historicalPrice } = props
  const asset = useAsset(value.denom)

  if (!asset) return null

  const assetAmount = demagnify(value.amount.toString(), asset)
  const isZero = assetAmount === 0
  const isBelowMinAmount = assetAmount < MIN_AMOUNT
  const displayAmount = isBelowMinAmount ? MIN_AMOUNT : assetAmount

  const calculateValue = () => {
    if (!value.amount || value.amount === BN_ZERO) {
      return BN_ZERO
    }

    if (historicalPrice) {
      return BN(historicalPrice).multipliedBy(assetAmount)
    }
    return getCoinValue(value, assetData)
  }
  const assetValue = calculateValue()

  return (
    <TitleAndSubCell
      title={
        <div className='flex items-center justify-end'>
          <AssetImage asset={asset} className='w-4 h-4 mr-1' />
          <FormattedNumber
            amount={displayAmount}
            smallerThanThreshold={!isZero && isBelowMinAmount}
            options={{ minDecimals: 1, maxDecimals: 2, abbreviated: true }}
            className='text-xs'
            animate={false}
          />
          <Text size='xs' className='text-white/60 pl-0.5'>
            {asset ? asset.symbol : 'Unknown Asset'}
          </Text>
        </div>
      }
      sub={
        <div className='flex items-center justify-end gap-1'>
          <DisplayCurrency
            coin={BNCoin.fromDenomAndBigNumber(ORACLE_DENOM, assetValue)}
            className='text-xs'
            options={{ minDecimals: 1, maxDecimals: 2, abbreviated: true }}
            animate={false}
          />
          <Tooltip
            type='info'
            content={
              <Text size='xs'>
                {historicalPrice
                  ? 'Price of the asset when liquidation happened'
                  : 'Current price of the asset'}
              </Text>
            }
          >
            <InfoCircle className='w-3.5 h-3.5 text-white/40 hover:text-inherit' />
          </Tooltip>
        </div>
      }
    />
  )
}
