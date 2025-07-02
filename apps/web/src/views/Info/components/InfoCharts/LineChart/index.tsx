import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  ReferenceLine,
  Legend,
  Brush,
  Rectangle,
  Text,
} from 'recharts'
import useTheme from 'hooks/useTheme'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CustomTooltipStyle = styled.div`
  position: relative;
  .content {
    width: 150px;
    height: 50px;
    padding: 8px;
    position: relative;
    z-index: 3;
    left: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: black;
    background: transparent;
    outline: none;

    .price {
      margin: auto;
      display: flex;
      .dola {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: rgba(255, 255, 255, 0.6);
      }

      .value {
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        margin-left: 4px;
        color: #ffffff;
      }

      .change {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        margin-left: 4px;
        color: #ffffff;
      }

      .positive {
        color: #64c66d;
      }

      .negative {
        color: #ff0000;
      }
    }

    .time {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
      white-space: nowrap;
    }
    .border {
      position: absolute;
      top: -1px;
      left: -1px;
      width: 152px;
      height: 52px;
      z-index: -2;
      background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
      border-radius: 10px;
    }
    .border2 {
      position: absolute;
      top: 0;
      left: 0;
      width: 150px;
      height: 50px;
      z-index: -1;
      background: #242424;
      border-radius: 10px;
    }
    .vertical {
      position: absolute;
      top: 100%;
      left: 75px;
      width: 1px;
      z-index: -2;
      height: 16px;
      background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
      border-radius: 10px;
    }
    svg {
      position: absolute;
      top: calc(100% + 20px);
      transform: translate(-50%, -50%);
      left: 75px;
      z-index: -2;
    }
  }
`

const CustomResponsiveContainer = styled(ResponsiveContainer)`
  .recharts-wrapper .recharts-cartesian-grid-horizontal line:nth-last-child(2),
  .recharts-wrapper .recharts-cartesian-grid-horizontal line:last-child {
    stroke-opacity: 0 !important;
  }

  .recharts-wrapper {
    cursor: pointer !important;
  }
`

export type LineChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
  minYAxis?: number
  maxYAxis?: number
  typeXAxis?: string
  showXAxis?: boolean
  hoverableChart?: boolean
  unsupported?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const intToString = (num: any) => {
  if (num < 1000) {
    return num
  }
  const si = [
    { v: 1e3, s: 'K' },
    { v: 1e6, s: 'M' },
    { v: 1e9, s: 'B' },
    { v: 1e12, s: 'T' },
    { v: 1e15, s: 'P' },
    { v: 1e18, s: 'E' },
  ]
  let index
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break
    }
  }
  return (num / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s
}

const displayNumber = (number: string) => {
  const arr = number.split('.')
  if (arr[0] === '0') {
    let afterDot = ''
    for (var i = 0; i < arr[1].length && i < 6; i++) {
      if (arr[1].charAt(i) === '0') {
        afterDot += arr[1].charAt(i)
      } else {
        afterDot += arr[1].charAt(i)
        if (i + 1 < arr[1].length && i + 1 < 6) afterDot += arr[1].charAt(i + 1)
        if (i + 2 < arr[1].length && i + 2 < 6) afterDot += arr[1].charAt(i + 2)
        break
      }
    }
    return `${arr[0]}.${afterDot}`
  }
  return intToString(formatAmountNumber(parseFloat(number), 2))
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipStyle className="custom-tooltip">
        <div className="content">
          <div className="price">
            <p className="dola">$</p>
            <p className="value">{displayNumber(payload[0].payload.value.toString())}</p>
            <p
              className={`change ${
                payload[0].payload.priceChange > 0 ? 'positive' : payload[0].payload.priceChange < 0 ? 'negative' : ''
              }`}
            >
              {payload[0].payload.priceChange > 0 ? '+' : ''}
              {payload[0].payload.priceChange}%
            </p>
          </div>
          <div className="time">
            {new Date(label).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}{' '}
            {new Date(label).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="border" />
          <div className="border2" />
          <div className="vertical" />
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
            <g filter="url(#filter0_d_10957_45057)">
              <circle cx="23.0908" cy="22.9092" r="7.90918" fill="#829695" />
            </g>
            <circle cx="23.0908" cy="22.9097" r="3.95459" fill="white" />
            <circle cx="23.0908" cy="22.9097" r="3.95459" fill="white" />
            <defs>
              <filter
                id="filter0_d_10957_45057"
                x="0.181641"
                y="0"
                width="45.8184"
                height="45.8184"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="7.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.329412 0 0 0 0 0.698039 0 0 0 0 0.6 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10957_45057" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10957_45057" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </CustomTooltipStyle>
    )
  }

  return null
}

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({
  data,
  setHoverValue,
  setHoverDate,
  minYAxis,
  maxYAxis,
  typeXAxis,
  showXAxis,
  hoverableChart,
  unsupported,
}: LineChartProps) => {
  const { isMobile } = useMatchBreakpoints()
  let [lineGraphData, setLineGraphData] = useState<any>()
  const [chartWidth, setChartWidth] = useState<number>(0)
  const [chartHeight, setChartHeight] = useState<number>(0)

  const displayWindowSize = () => {
    const recharts = document.querySelector('.recharts-cartesian-grid')
    if (!recharts) return
    setChartWidth(recharts.getBoundingClientRect().width - 10)
    setChartHeight(recharts.getBoundingClientRect().height)
  }

  useEffect(() => {
    const intv = setInterval(displayWindowSize, 1000)

    return () => {
      clearInterval(intv)
    }
  }, [])

  const minGap = useMemo(() => {
    if (isMobile) return 60
    switch (typeXAxis) {
      case '7D':
      case '1D':
        return 120
      case '1M':
        return 50
      case '3M':
        return 50
      case '1Y':
        return 65
      default:
        return 120
    }
  }, [typeXAxis, isMobile])

  let tmpRsFormat
  const formatDate = (time: any) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const monthIndex = date.getMonth()
    const day = time.toLocaleDateString(undefined, { day: '2-digit' })
    const hour = `${date.getHours()}:00`
    let resultFormat: any = ''
    switch (typeXAxis) {
      case '1Y':
        resultFormat = tmpRsFormat === monthNames[monthIndex] ? '' : monthNames[monthIndex]
        tmpRsFormat = monthNames[monthIndex]
        break
      case '3M':
        resultFormat = day
        break
      case '1M':
        resultFormat = tmpRsFormat === day ? '' : day
        tmpRsFormat = day
        break
      case '7D':
        resultFormat = tmpRsFormat === day ? '' : day
        tmpRsFormat = day
        break
      case '1D':
        resultFormat = hour
        break
      default:
        resultFormat = tmpRsFormat === year ? '' : year
        tmpRsFormat = year
    }
    return resultFormat
  }

  const formatMonth = (month: any) => {
    return monthNames[month]
  }

  const {
    currentLanguage: { locale },
  } = useTranslation()
  const { theme } = useTheme()

  if (!data || data.length === 0) {
    return <LineChartLoader unsupported={unsupported} />
  }

  return (
    <CustomResponsiveContainer>
      <AreaChart
        data={data.map((d) => {
          return { ...d, avg: [(minYAxis + maxYAxis) / 2, d.value] }
        })}
        width={300}
        height={308}
        // margin={{
        //   top: 5,
        //   right: 20,
        //   left: 0,
        //   bottom: 5,
        // }}
        style={{ cursor: 'pointer!important' }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined)
          if (setHoverValue) setHoverValue(undefined)
        }}
        onMouseMove={(data) => {
          setLineGraphData(data)
        }}
      >
        <CartesianGrid vertical={false} stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="3 3" />
        {/* <CartesianGrid strokeDasharray="4 1 2" /> */}
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9BF3CB" />
            <stop offset="30%" stopColor="#3EC0A6" />
            <stop offset="60%" stopColor="#F44234" />
            <stop offset="100%" stopColor="#9F3A83" />
          </linearGradient>
          {/* <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.colors.inputSecondary} stopOpacity={0.5} />
            <stop offset="100%" stopColor={theme.colors.secondary} stopOpacity={0} />
          </linearGradient> */}
        </defs>
        <XAxis
          xAxisId="0"
          dataKey="time"
          tickCount={10}
          axisLine={{ stroke: '#ffffff66' }}
          tickFormatter={(time) => formatDate(time)}
          minTickGap={minGap}
          allowDuplicatedCategory={false}
          fontSize={showXAxis ? '14px' : '0px'}
          fontWeight="17px"
          color="rgba(255, 255, 255, 0.6)"
          tickMargin={10}
          allowDataOverflow
          padding={{ left: 0, right: 10 }}
          interval={typeXAxis === 'ALL' && data?.length < 100 ? 0 : 'preserveStartEnd'}
        />
        {hoverableChart && typeXAxis === '3M' && (
          <XAxis
            xAxisId="1"
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickFormatter={(month) => formatMonth(month)}
            fontSize={showXAxis ? '14px' : '0px'}
            allowDuplicatedCategory={false}
            padding={{ left: 0, right: 10 }}
          />
        )}
        <YAxis
          dataKey="value"
          tickCount={2}
          scale="linear"
          axisLine={false}
          tickLine={false}
          minTickGap={46}
          domain={[minYAxis, maxYAxis]}
          tickFormatter={(val) => `$${intToString(formatAmountNumber(val, 4))}`}
          orientation="left"
          allowDataOverflow
          tick={{ dx: 0, fill: 'rgba(255, 255, 255, 0.6)' }}
          fontSize="14px"
          fontWeight="400"
        />
        {hoverableChart ? (
          <Tooltip
            content={<CustomTooltip />}
            position={{
              x: (lineGraphData?.activeTooltipIndex * chartWidth) / (data.length - 1) - 10 || 0,
              y:
                chartHeight -
                65 -
                (((lineGraphData?.activePayload?.[0]?.payload?.value || maxYAxis) - minYAxis) * chartHeight) /
                  (maxYAxis - minYAxis),
            }}
            wrapperStyle={{ outline: 'none' }}
            cursor={false}
          />
        ) : (
          <Tooltip
            cursor={{ stroke: theme.colors.secondary }}
            contentStyle={{ display: 'none' }}
            formatter={(tooltipValue, name, props) => {
              setHoverValue(props.payload.value)
              setHoverDate(
                props.payload.time.toLocaleString(locale, {
                  year: 'numeric',
                  day: 'numeric',
                  month: 'short',
                }),
              )
              return null
            }}
          />
        )}
        <Area
          dataKey="avg"
          type="natural"
          stroke="url(#color)"
          fill="none"
          strokeWidth={4}
          // baseValue={maxYAxis}
          // baseLine={1}
          // startOffset={minYAxis}
          activeDot={{ stroke: '#82969500', fill: '#FFFFFF00', strokeWidth: 4, r: 6 }}
        />
      </AreaChart>
    </CustomResponsiveContainer>
  )
}

export default LineChart
