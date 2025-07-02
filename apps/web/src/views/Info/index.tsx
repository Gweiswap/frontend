import { ChainId } from '@pancakeswap/sdk'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { useGetChainName } from 'state/info/hooks'
import { useRouter } from 'next/router'
import { useActiveChainId } from 'hooks/useActiveChainId'

export const InfoPageLayout = ({ children }) => {
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const router = useRouter()
  const chainName = useGetChainName()

  useEffect(() => {
    if (account && chainId === ChainId.BSC && (router.query?.chainName == 'eth' || router.query?.chainName === 'neo'))
      router.replace('/info', undefined, { shallow: true })
    if (account && chainId === ChainId.ETHEREUM && router.query?.chainName !== 'eth')
      router.replace('/info/eth', undefined, { shallow: true })
    if (account && chainId === ChainId.NEO_EVM_TESTNET && router.query?.chainName !== 'neo')
      router.replace('/info/neo', undefined, { shallow: true })
  }, [chainId, account, chainName, router])

  return (
    <>
      {/* {chainName === 'BSC' && (
        <SubMenuItems
          items={[
            {
              label: t('Swap'),
              href: '/info',
            },
            {
              label: t('StableSwap'),
              href: '/info?type=stableSwap',
            },
          ]}
          activeItem={isStableSwap ? '/info?type=stableSwap' : '/info'}
        />
      )} */}

      {children}
    </>
  )
}
