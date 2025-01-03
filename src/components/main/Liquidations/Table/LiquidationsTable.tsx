import Account from 'components/main/Liquidations/Table/Cell/Account'
import Asset from 'components/main/Liquidations/Table/Cell/Asset'
import LiquidationPrice from 'components/main/Liquidations/Table/Cell/LiquidationPrice'
import Pagination from 'components/main/Liquidations/Table/Pagination'
import Table from 'components/common/Table'
import Text from 'components/common/Text'
import Timestamp from 'components/main/Liquidations/Table/Cell/Timestamp'
import Transaction from 'components/main/Liquidations/Table/Cell/Transaction'
import useAssets from 'hooks/assets/useAssets'
import useLiquidations from 'hooks/liquidations/useLiquidations'
import { CircularProgress } from 'components/common/CircularProgress'
import { ColumnDef, Row } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

export default function LiquidationsTable() {
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const pageSize = 25
  const maxEntries = 200

  const { data: liquidityData, isLoading: isLiquidityDataLoading } = useLiquidations(page, pageSize)
  const { data: assetsData } = useAssets()
  const totalPages = Math.ceil(maxEntries / pageSize)

  useEffect(() => {
    if (liquidityData) {
      setHasMore(liquidityData.length === pageSize)
    }
  }, [liquidityData])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const isLoading = isLiquidityDataLoading || !liquidityData

  const columns = useMemo<ColumnDef<LiquidationDataItem>[]>(() => {
    const baseColumns = [
      {
        header: 'Time',
        meta: { className: 'min-w-20' },
        cell: ({ row }: { row: Row<LiquidationDataItem> }) => {
          return <Timestamp value={row.original.timestamp as string} />
        },
      },
      {
        header: 'Account ID',
        cell: ({ row }: { row: Row<LiquidationDataItem> }) => {
          return <Account value={row.original.liquidatee_account_id as string} />
        },
      },
      {
        header: 'Liquidated Collateral',
        cell: ({ row }: { row: Row<LiquidationDataItem> }) => {
          return (
            <Asset value={row.original.collateral_asset_won as BNCoin} assetData={assetsData} />
          )
        },
      },
      {
        header: 'Liquidation Price',
        cell: ({ row }: { row: Row<LiquidationDataItem> }) => {
          return <LiquidationPrice value={row.original ?? 'N/A'} />
        },
      },

      {
        header: 'Repaid Debt',
        cell: ({ row }: { row: Row<LiquidationDataItem> }) => {
          return (
            <Asset
              value={row.original.debt_asset_repaid as BNCoin}
              assetData={assetsData}
              historicalPrice={row.original.price_debt_repaid}
            />
          )
        },
      },
      {
        header: 'Protocol Fee',
        cell: ({ row }: { row: Row<LiquidationDataItem> }) => {
          return (
            <Asset
              value={row.original.protocol_fee_coin as BNCoin}
              assetData={assetsData}
              historicalPrice={row.original.price_protocol_fee_coin}
            />
          )
        },
      },
      {
        header: 'Transaction',
        cell: ({ row }: { row: Row<LiquidationDataItem> }) => {
          return <Transaction value={row.original.tx_hash as string} />
        },
      },
    ]
    return baseColumns
  }, [assetsData])

  if (isLoading) {
    return (
      <div className='flex flex-wrap justify-center w-full gap-4'>
        <CircularProgress size={60} />
        <Text className='w-full text-center' size='xl'>
          Fetching data...
        </Text>
      </div>
    )
  }

  if (!liquidityData.length || liquidityData === null) {
    return (
      <div className='flex flex-wrap justify-center w-full gap-4'>
        <Text className='w-full text-center' size='xl'>
          No liquidation data available
        </Text>
      </div>
    )
  }

  return (
    <>
      <Table
        title='Recently Executed Liquidations'
        columns={columns}
        data={liquidityData}
        tableBodyClassName='text-lg'
        initialSorting={[]}
      />

      {hasMore && liquidityData?.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={page + (hasMore ? 1 : 0)}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
