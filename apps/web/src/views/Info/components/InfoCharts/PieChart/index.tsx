import { isAddress } from '@ethersproject/address'
import { useTranslation } from '@pancakeswap/localization'
import { ChainId, Token } from '@pancakeswap/sdk'
import { CurrencyLogo } from 'components/Logo'
import BNBIcon from 'components/Svg/BNBIcon'
import GoerliIcon from 'components/Svg/GoerliIcon'
import GASIcon from 'components/Svg/GASIcon'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { useActiveChainId } from 'hooks/useActiveChainId'
import React from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import styled from 'styled-components'

// const RADIAN = Math.PI / 180

const CustomTooltipStyle = styled.div`
  position: relative;
  .content {
    width: fit-content !important;
    height: 38px;
    background: #242424;
    border-radius: 10px;
    padding: 8px;
    display: flex;
    align-items: center;

    .symbol {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.87);
      margin-right: 4px;
    }

    .label {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
    }

    .image {
      margin-right: 4px;
      margin-top: 4px;
    }

    .image * {
      margin-bottom: 0;
      width: 24px;
      height: 24px;
    }
  }

  .border {
    width: calc(100% + 2px);
    height: 40px;
    background: linear-gradient(180deg, rgba(220, 96, 50, 0.3) 0%, rgba(254, 64, 57, 0.3) 100%);
    position: absolute;
    left: -1px;
    top: -1px;
    z-index: -1;
    border-radius: 10px;
  }
`

const PieWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  color: rgba(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 16px;
  position: relative;

  .recharts-wrapper {
    cursor: pointer !important;
  }

  .circle {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: -1;
  }

  .icon {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: -1;
  }
`

const CustomTooltip = ({ active, payload }: any) => {
  const { chainId } = useActiveChainId()

  const icon = () => {
    if (!active || !payload || !payload.length) return null

    switch (payload[0].name) {
      case 'ETH':
      case 'BNB':
        return <CurrencyLogo currency={new Token(chainId, payload[0].name, 18, payload[0].name)} />
      case 'Others':
        return <></>
      case 'XOX':
        return <CurrencyLogo currency={new Token(chainId, XOX_ADDRESS[chainId], 18, 'XOX')} />
      case 'tBNB':
        return <CurrencyLogo currency={new Token(chainId, payload[0].name, 18, payload[0].name)} />
      case 'GOR':
        return <CurrencyLogo currency={new Token(chainId, payload[0].name, 18, payload[0].name)} />
      case 'GAS':
        return <CurrencyLogo currency={new Token(chainId, payload[0].name, 18, payload[0].name)} />
      default:
        return (
          <CurrencyLogo
            currency={new Token(chainId, USD_ADDRESS[chainId === 1 || chainId === 5 ? 1 : 56], 18, 'USD')}
          />
        )
    }
  }

  if (active && payload && payload.length) {
    return (
      <CustomTooltipStyle>
        <div className="border" />
        <div className="content">
          <span className="image">{icon()}</span>
          <span className="symbol">{payload[0].name}</span>
          <span className="label">{payload[0].value}%</span>
        </div>
      </CustomTooltipStyle>
    )
  }

  return null
}

export default function InfoPieChart({ data, colors, total }) {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  return (
    <PieWrapper>
      {total > 0 ? (
        // <Chart chartType="PieChart" data={data} options={options} width="100%" height="200px" />
        //         <PieChart width={730} height={250}>
        //   <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        // </PieChart>
        <>
          <PieChart width={250} height={250}>
            <defs>
              {data.map((entry, index) => (
                <linearGradient id={`myGradient${index}`}>
                  <stop offset="0%" stopColor={colors[index % colors.length].start} />
                  <stop offset="100%" stopColor={colors[index % colors.length].end} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              outerRadius={95}
              dataKey="value"
              nameKey="name"
              startAngle={90}
              endAngle={-270}
              innerRadius={85}
              cornerRadius={40}
              paddingAngle={5}
              // onMouseOver={renderCustomizedLabel}
            >
              {data.map((_: any, index: number) => (
                <Cell
                  key={colors[index % colors.length]}
                  style={{
                    filter: `drop-shadow(0px 0px 10px ${colors[index % colors.length].start}`,
                  }}
                  stroke="none"
                  fill={`url(#myGradient${index})`}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
          </PieChart>
          <svg height="160" width="160" className="circle">
            <circle cx="80" cy="80" r="75" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </svg>
          {(chainId === ChainId.BSC_TESTNET || chainId === ChainId.BSC) && <BNBIcon />}
          {(chainId === ChainId.GOERLI || chainId === ChainId.ETHEREUM) && <GoerliIcon />}
          {(chainId === ChainId.NEO_EVM_TESTNET) && <GASIcon />}
        </>
      ) : (
        t('No Data')
      )}
    </PieWrapper>
  )
}
