import AreaChartLoading from 'components/common/Chart/common/AreaChartLoading'
import ChartCardWrapper from 'components/common/Chart/common/ChartWrapper/ChartCardWrapper'
import DynamicLineChartBody from 'components/common/Chart/DynamicLineChart/DynamicLineChartBody'

interface Props {
  data: MergedChartData[]
  title: string | React.ReactNode
  loading?: boolean
  lines: LineConfig[]
  height?: string
  customYAxisDomain?: (values: number[]) => [number, number]
}

export default function DynamicLineChart(props: Props) {
  const { data, loading, lines, height = 'h-65', title, customYAxisDomain } = props

  return (
    <ChartCardWrapper title={title}>
      {data === null || loading ? (
        <AreaChartLoading height={height} />
      ) : (
        <DynamicLineChartBody
          data={data}
          lines={lines}
          height={height}
          customYAxisDomain={customYAxisDomain}
        />
      )}
    </ChartCardWrapper>
  )
}
