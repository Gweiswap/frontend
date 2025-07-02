import ReactECharts from 'echarts-for-react'
import React, { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BTNLearnMore } from 'views/Company'
import useWindowSize from 'hooks/useWindowSize'
import { useTranslation } from '@pancakeswap/localization'
import { EChartsOption, SeriesOption } from 'echarts'
import BigNumber from 'bignumber.js'
import { StyledAAD, StyledItemAAD, StyledTitle } from './styled'
import { useMatchBreakpoints } from '@pancakeswap/uikit'

interface IAAD {
  title: string
  content: Array<string>
  color?: string
  highLight?: boolean
  value?: number
}

function AADItem({
  data,
  className,
  onMouseEnter,
  onMouseLeave,
  active,
  ...props
}: {
  data: IAAD
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  active?: boolean
}) {
  const { highLight, content, title, color } = data
  return (
    <StyledItemAAD
      {...props}
      id="AADItem"
      onMouseEnter={onMouseEnter && onMouseEnter}
      onMouseLeave={onMouseLeave && onMouseLeave}
      className={`${className || ''} ${highLight ? 'highLight' : ''} ${active ? 'active' : ''}`}
      style={{ ...(props as any).style, '--color': color }}
    >
      <h3>{title}</h3>
      {content.map((text, i) => (
        <p key={String(`${i}`)}>{text}</p>
      ))}
    </StyledItemAAD>
  )
}

const ADDComponent = () => {
  const { t } = useTranslation()
  const AADChart = useRef<ReactECharts>()
  const { width } = useWindowSize()
  const { isDesktop } = useMatchBreakpoints()

  const AAD_DATA_L: Array<IAAD> = useMemo(() => {
    return [
      {
        title: t('Team allocation'),
        content: [`${new BigNumber(12600000).toFormat()} Tokens`, t('0% at TGE & 5 years vesting 20% Yearly')],
        color: '#D8D8D8',
        value: 12600000,
      },
      {
        title: t('Company Reserve'),
        content: [`${new BigNumber(18000000).toFormat()} Tokens`, t('0% at TGE & 4 years vesting 25% Yearly')],
        color: '#969696',
        value: 18000000,
      },
      {
        title: t('Strategic Partnership'),
        content: [`${new BigNumber(9000000).toFormat()} Tokens`, t('0% at TGE & 5 years vesting 20% Yearly')],
        color: '#BAFFBF',
        value: 9000000,
      },
      {
        title: t('Ecosystem Growth'),
        content: [`${new BigNumber(27000000).toFormat()} Tokens`, t('33.33% at TGE & 4 years vesting 16.67% Yearly')],
        color: '#86B6FF',
        value: 27000000,
      },
      {
        title: t('Community Rewards'),
        content: [`${new BigNumber(1800000).toFormat()} Tokens`, t('25% at TGE & 3 years vesting 25% Yearly')],
        color: '#50817C',
        value: 1800000,
      },
      {
        title: t('XOX labs Foundation'),
        content: [`${new BigNumber(5400000).toFormat()} Tokens`, t('0% at TGE & 5 years vesting 20% Yearly')],
        color: '#64C6BA',
        value: 5400000,
      },
    ]
  }, [])
  const AAD_DATA_R: Array<IAAD> = useMemo(() => {
    return [
      {
        title: t('LP Farming'),
        content: [
          `${new BigNumber(18000000).toFormat()} Tokens`,
          t('20% at Launch then 10% unlock Each year for 8 years'),
        ],
        color: '#FFB547',
        value: 18000000,
      },
      {
        title: t('Seed Sale'),
        content: [`${new BigNumber(3600000).toFormat()} Tokens`, t('10% TGE - 20% Unlock Monthly - 10% Last Month')],
        color: '#FB8618',
        value: 3600000,
      },
      {
        title: t('Partners Sale'),
        content: [`${new BigNumber(5400000).toFormat()} Tokens`, t('10% release at TGE then 5% release Monthly')],
        color: '#FF5353',
        value: 5400000,
      },
      {
        title: t('Pre Sale'),
        content: [`${new BigNumber(10800000).toFormat()} Tokens`, t('10% release at TGE then 10% release Monthly')],
        color: '#C20DA3',
        value: 10800000,
      },
      {
        title: t('Public Sale'),
        content: [`${new BigNumber(36000000).toFormat()} Tokens`, t('40% realease at TGE then 10% Monthly')],
        color: '#A964C9',
        value: 36000000,
      },
      {
        title: t('Liquidity Pools DEX'),
        content: [`${new BigNumber(14400000).toFormat()} Tokens`, t('100% lock 5 years')],
        color: '#3D8AFF',
        value: 14400000,
      },
      {
        title: t('CEX Listing'),
        content: [`${new BigNumber(18000000).toFormat()} Tokens`, t('TGE = 40% then 10% Monthly Release')],
        color: 'pink',
        value: 18000000,
      },
    ]
  }, [])
  const AAD_TOTAL = useMemo(() => {
    return [...AAD_DATA_L, ...AAD_DATA_R].map((aad) => aad.value).reduce((a, b) => a + b, 0)
  }, [AAD_DATA_L, AAD_DATA_R])

  const AAD_DATA_TOTAL: IAAD = useMemo(() => {
    return {
      title: t('XOX Token Metrics'),
      content: [`TGE (28.35%) - 51,030,000 Tokens`],
      highLight: true,
      value: AAD_TOTAL,
    }
  }, [AAD_TOTAL])

  const AAD_CHART_OPTION: EChartsOption = {
    tooltip: { show: false },
    legend: { show: false },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['35%', '74%'],
        itemStyle: { borderWidth: 3, borderColor: '#fff' },
        label: {
          show: !(width < 1200),
          formatter: (param) => `${param.percent}%`,
          color: '#ffffff',
          fontSize: 14,
          width: 100,
        },
        labelLine: {
          show: !(width < 1200),
        },
        data: [...AAD_DATA_L, ...AAD_DATA_R].map((item) => ({
          name: item.title,
          value: item.value,
          itemStyle: {
            color: item.color
              ? item.color
              : item.highLight
              ? {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#B809B5' },
                    { offset: 0.5, color: '#ED1C51' },
                    { offset: 1, color: '#FFB000' },
                  ],
                }
              : '#00000000',
          },
        })),
        emphasis: { focus: 'self' },
      },
    ],
  }

  const itemHandleChart = useCallback(
    (id: string | Array<string>, highLight: boolean) => {
      const a = AADChart.current.getEchartsInstance()
      a.dispatchAction({ type: highLight ? 'highlight' : 'downplay', dataIndex: id })
    },
    [AADChart],
  )
  const chartHandleItem = useCallback((params: any, highLight: boolean) => {
    const items = document.querySelectorAll('#AADItem')
    if (highLight) {
      items[params.dataIndex + 1].classList.add('active')
    } else {
      items[params.dataIndex + 1].classList.remove('active')
    }
  }, [])

  return (
    <>
      <StyledTitle>{t('Allocation and Distribution')}</StyledTitle>

      <StyledAAD>
        <div className="l">
          <AADItem
            data={AAD_DATA_TOTAL}
            // onMouseEnter={() => itemHandleChart(AADIndex, true)}
            // onMouseLeave={() => itemHandleChart(AADIndex, false)}
          />

          {AAD_DATA_L.map((item, i) => (
            <AADItem
              data={item}
              key={String(`a${i}`)}
              onMouseEnter={() => isDesktop && itemHandleChart(`${i}`, true)}
              onMouseLeave={() => isDesktop && itemHandleChart(`${i}`, false)}
            />
          ))}
        </div>
        <div className="c">
          <div>
            <ReactECharts
              option={AAD_CHART_OPTION}
              style={{ height: 'inherit' }}
              ref={AADChart}
              onEvents={
                isDesktop
                  ? {
                      mouseover: (eve) => isDesktop && chartHandleItem(eve, true),
                      mouseout: (eve) => isDesktop && chartHandleItem(eve, false),
                    }
                  : {}
              }
            />
            <div>
              <h1>{t('Total Supply')}</h1>
              <p>
                {new BigNumber(AAD_DATA_TOTAL.value).toFormat()}
                <br />
                Tokens
              </p>
            </div>
          </div>
        </div>
        <div className="r">
          {AAD_DATA_R.map((item, i) => (
            <AADItem
              data={item}
              key={String(`a${i}`)}
              className="b-l"
              onMouseEnter={() => isDesktop && itemHandleChart(`${i + AAD_DATA_L.length}`, true)}
              onMouseLeave={() => isDesktop && itemHandleChart(`${i + AAD_DATA_L.length}`, false)}
            />
          ))}
        </div>
        <div className="bg">
          <div />
          <div />
          <div />
          <div />
        </div>
      </StyledAAD>
    </>
  )
}

export default ADDComponent
