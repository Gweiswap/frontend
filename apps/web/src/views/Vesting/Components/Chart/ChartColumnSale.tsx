import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'
import useWindowSize from 'hooks/useWindowSize'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import styled from 'styled-components'

interface IDataitem {
  name: string
  uv: number
  pv: number
  amt: number
}
interface PropsColumnChart {
  data: IDataitem[]
}

const CustomTooltipStyle = styled.div`
  background: #242424;
  border-radius: 10px;
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(254, 64, 57, 0.3);
`

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipStyle>
        <p className="label">{`$${Number(formatAmountNumber(payload[0].payload.uv, 2)).toLocaleString()}`}</p>
      </CustomTooltipStyle>
    )
  }

  return null
}

function ChartColumnSale(props: PropsColumnChart) {
  const { data } = props
  const { width } = useWindowSize()
  return (
    <ResponsiveContainer width="100%" height={width <= 900 ? 142 : 121}>
      <BarChart data={data} barSize={width <= 900 ? 8 : 10}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="100%" spreadMethod="reflect">
            <stop offset="25%" style={{ stopColor: 'rgba(110, 225, 208, 1)', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: 'rgba(150, 132, 112, 1)', stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: 'rgba(243, 66, 54, 1)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(167, 59, 124, 1)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 400, fill: 'rgba(255, 255, 255, 0.6)' }} />
        <Bar dataKey="uv" fill="url(#colorUv)" radius={[20, 20, 20, 20]} style={{ cursor: 'pointer' }} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ChartColumnSale
