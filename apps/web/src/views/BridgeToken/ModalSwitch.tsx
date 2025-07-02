import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ModalContainer, ModalHeader, ModalCloseButton } from '@pancakeswap/uikit'
import { NETWORK_ICON, NETWORK_LABEL } from './networks'
import { useTranslation } from '@pancakeswap/localization'

const StyledModalContainer = styled(ModalContainer)`
  width: 448px;
  padding-bottom: 20px;
  max-width: calc(100vw - 48px) !important;
  max-height: 90vh;
  position: relative;
  background: #101010;

  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: auto;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }
  @media screen and (max-width: 450px) {
    position: fixed;
    top: 20%;
  }
`

const StyledModalHeader = styled(ModalHeader)`
  padding-top: 20px;
  padding-bottom: 0;
  border: none;
  & > div {
    display: block;
  }
  & > div button {
    left: 17px;

    svg {
      fill: #8e8e8e;
    }
  }

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
    @media screen and (max-width: 576px) {
      font-size: 20px;
    }
  }

  button {
    position: absolute;
    top: 17px;
    right: 17px;
    background: 0;
    padding: 0;
    width: 20px;
    height: 20px;
  }

  button:hover {
    background: none !important;
  }
`

const ListNetWork = styled.div`
  padding: 0 20px;
  max-height: 400px;
  overflow-y: auto;
  display: grid;
  gap: 15px;
  margin-top: 20px;
  flex-direction: column;
  button {
    border: 1px solid ${({ theme }) => theme.colors.hr};
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: none;
    cursor: pointer;
    &:hover {
      background-color: #1d1d1d;
    }
  }
  button.active {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    cursor: auto;
    &:hover {
      opacity: 0.8;
    }
  }
  .title-network {
    font-style: normal;
    font-weight: 400;
    font-size: ${isMobile ? '14px' : '18px'};
    padding-left: ${isMobile ? '5px' : '12px'} !important;
    color: ${({ theme }) => theme.colors.textSubTitle};
  }
  img {
    border-radius: 50%;
  }
  .image-network {
    margin-right: ${isMobile ? '5px' : '12px'} !important;
  }
  .gap-4 {
    gap: 16px;
  }
`

type Props = {
  currentToken: ERC20Token
  handleChangeNetwork: (currentChainId: ChainId, cid: ChainId) => void
  onDismiss?: any
}

export default function SwitchNetworkModal(props: Props): JSX.Element {
  const { currentToken, handleChangeNetwork, onDismiss } = props
  const { t } = useTranslation()
  const { chainId: activedChainId } = useActiveChainId()

  const arrNetwork =
    process.env.NEXT_PUBLIC_TEST_MODE === '1'
      ? [
          ChainId.ETHEREUM,
          ChainId.GOERLI,
          ChainId.BSC,
          ChainId.BSC_TESTNET,
          ChainId.ARBITRUM,
          ChainId.ARBITRUM_TESTNET,
          ChainId.POLYGON,
          ChainId.POLYGON_TESTNET,
          ChainId.ZKSYNC,
          ChainId.ZKSYNC_TESTNET,
          ChainId.OPTIMISM,
          ChainId.OPTIMISM_TESTNET,
          ChainId.NEO_EVM_TESTNET
        ]
      : [ChainId.ETHEREUM, ChainId.BSC, ChainId.ARBITRUM, ChainId.POLYGON, ChainId.ZKSYNC, ChainId.OPTIMISM]

  const handleOnSelectNetwork = (cid: ChainId) => {
    if (cid === currentToken?.chainId) return

    handleChangeNetwork(currentToken?.chainId, cid)
    onDismiss()
  }

  if (!activedChainId) return null

  return (
    <StyledModalContainer>
      <StyledModalHeader style={{ justifyContent: 'center' }}>
        <h2>{t('Select a Network')}</h2>
        <ModalCloseButton onDismiss={onDismiss} />
      </StyledModalHeader>
      <ListNetWork
        className={`${
          isMobile ? 'gap-4' : 'gap-6'
        } grid grid-flow-row-dense grid-cols-1 overflow-y-auto md:grid-cols-1 magin`}
      >
        {arrNetwork.map((cid: ChainId) => {
          return (
            <button
              onClick={() => handleOnSelectNetwork(cid)}
              style={isMobile ? { height: '60px' } : { height: '60px' }}
              className={`${currentToken?.chainId === cid && 'active'}`}
              key={cid}
            >
              <div className="title-network">{NETWORK_LABEL[cid] === 'BSC' ? 'BNB Chain' : NETWORK_LABEL[cid]}</div>
              <div className="image-network">
                <img
                  src={NETWORK_ICON[cid]}
                  alt=""
                  className=""
                  width={isMobile ? '32px' : '36px'}
                  height={isMobile ? '32px' : '36px'}
                />
              </div>
            </button>
          )
        })}
      </ListNetWork>
    </StyledModalContainer>
  )
}
