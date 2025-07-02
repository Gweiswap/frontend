import { ChainId, Token } from '@pancakeswap/sdk'
import { useEffect, useMemo, useState } from 'react'
import { multiChainId } from 'state/info/constant'
import styled from 'styled-components'
import getTokenLogoURL from '../../../../utils/getTokenLogoURL'
import LogoLoader from './LogoLoader'
import axios from 'axios'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { getAddress } from '@ethersproject/address'

const StyledLogo = styled(LogoLoader)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

export const CurrencyLogo: React.FC<
  React.PropsWithChildren<{
    address?: string
    size?: string
    chainName?: 'ETH' | 'BSC'
  }>
> = ({ address, size = '24px', chainName = 'BSC', ...rest }) => {
  const [coinmarketcapId, setCoinmarketcapId] = useState<string>('')
  const { chainId } = useActiveChainId()

  useEffect(() => {
    if (!address || !chainName) return
    let coinmarketcapIds = {}
    const coinmarketcapIdsJSON = localStorage.getItem('coinmarketcapIds')
    if (coinmarketcapIdsJSON) {
      coinmarketcapIds = JSON.parse(coinmarketcapIdsJSON)
      const id = coinmarketcapIds?.[chainName === 'ETH' ? 1 : 56]?.[address.toUpperCase()]
      if (id) {
        setCoinmarketcapId(id)
        return
      }
    }

    if (process.env.NEXT_PUBLIC_TEST_MODE !== '1' && (chainId === 5 || chainId === 97)) return
    if (chainId === ChainId.NEO_EVM_TESTNET) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/coins/info`, {
        params: { address: getAddress(address) },
      })
      .then((response) => {
        const tokenInfos = response.data.data
        const tokenInfo = Object.values(tokenInfos)[0] as any
        coinmarketcapIds[chainName === 'ETH' ? 1 : 56][address.toUpperCase()] = tokenInfo.id
        setCoinmarketcapId(tokenInfo.id)
        localStorage.setItem('coinmarketcapIds', JSON.stringify(coinmarketcapIds))
      })
      .catch((e) => console.warn(e))
  }, [chainName, address])

  const src = useMemo(() => {
    return getTokenLogoURL(new Token(multiChainId[chainName], address, 18, ''), coinmarketcapId)
  }, [address, chainName, coinmarketcapId])

  return <StyledLogo size={size} src={src} alt="token logo" {...rest} />
}

const DoubleCurrencyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 32px;
`

interface DoubleCurrencyLogoProps {
  address0?: string
  address1?: string
  size?: number
  chainName?: 'ETH' | 'BSC'
}

export const DoubleCurrencyLogo: React.FC<React.PropsWithChildren<DoubleCurrencyLogoProps>> = ({
  address0,
  address1,
  size = 16,
  chainName = 'BSC',
}) => {
  return (
    <DoubleCurrencyWrapper>
      {address0 && <CurrencyLogo address={address0} size={`${size.toString()}px`} chainName={chainName} />}
      {address1 && <CurrencyLogo address={address1} size={`${size.toString()}px`} chainName={chainName} />}
    </DoubleCurrencyWrapper>
  )
}
