import { formatAmountNumber, formatAmountNumber2 } from '@pancakeswap/utils/formatBalance'
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
  background: #fff;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: black;
`

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipStyle>
        <p className="label">
          {formatAmountNumber(payload[0].payload.uv, 2) > 1
            ? `${formatAmountNumber2(payload[0].payload.uv, 2)} points`
            : `${formatAmountNumber2(payload[0].payload.uv, 2)} point`}
        </p>
      </CustomTooltipStyle>
    )
  }

  return null
}

const ColumnChartRef = (props: PropsColumnChart) => {
  const { data } = props
  const { width } = useWindowSize()
  return (
    <ResponsiveContainer width="100%" height={121}>
      <BarChart data={data} barSize={width <= 900 ? 8 : 10}>
        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 400, fill: 'rgba(255, 255, 255, 0.6)' }} />
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6EE1D0" />
            <stop offset="30%" stopColor="#968470" />
            <stop offset="60%" stopColor="#F34236" />
            <stop offset="100%" stopColor="#A73B7C" />
          </linearGradient>
          {/* <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.colors.inputSecondary} stopOpacity={0.5} />
            <stop offset="100%" stopColor={theme.colors.secondary} stopOpacity={0} />
          </linearGradient> */}
        </defs>
        <Bar dataKey="uv" fill="url(#color)" radius={[20, 20, 20, 20]} stroke="url(#color)" strokeWidth={3} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ColumnChartRef
