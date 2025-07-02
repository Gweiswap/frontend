import { useCallback, useState, useRef, useEffect } from 'react'
import { Currency, Token } from '@pancakeswap/sdk'
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBackButton,
  ModalCloseButton,
  ModalBody,
  InjectedModalProps,
  Heading,
  Button,
  useMatchBreakpoints,
  MODAL_SWIPE_TO_CLOSE_VELOCITY,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { usePreviousValue } from '@pancakeswap/hooks'
import { TokenList } from '@pancakeswap/token-lists'
import { useTranslation } from '@pancakeswap/localization'
import CurrencySearch from './CurrencySearch'
import ImportToken from './ImportToken'
import Manage from './Manage'
import ImportList from './ImportList'
import { CurrencyModalView } from './types'

// const Footer = styled.div`
//   width: 100%;
//   background-color: ${({ theme }) => theme.colors.backgroundAlt};
//   text-align: center;
// `

const StyledModalContainer = styled(ModalContainer)`
  width: 448px;
  max-width: calc(100vw - 48px) !important;
  max-height: 90vh;
  position: relative;
  background: #101010;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
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
  padding-top: 32px;
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

const StyledModalBody = styled(ModalBody)`
  padding: 16px 27px 32px 27px;
  height: 438px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: unset;
  }

  & .curency-list {
    width: calc(100% + 15px) !important;
    padding-right: 15px;
    height: 310px !important;

    & > div > div {
      width: calc(100% - 10px) !important;
    }

    button {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px #242424;
      background-color: #242424;
    }

    &::-webkit-scrollbar {
      display: block;
      width: 6px;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: 5px; /* Firefox */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #444444;
    }
  }
`

export interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  commonBasesType?: string
  forliquidity?: boolean
}

export default function CurrencySearchModal({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = true,
  commonBasesType,
  forliquidity,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.search)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onDismiss?.()
      onCurrencySelect(currency)
    },
    [onDismiss, onCurrencySelect],
  )

  // for token import view
  const prevView = usePreviousValue(modalView)

  // used for import token flow
  const [importToken, setImportToken] = useState<Token | undefined>()

  // used for import list
  const [importList, setImportList] = useState<TokenList | undefined>()
  const [listURL, setListUrl] = useState<string | undefined>()

  const { t } = useTranslation()

  const config = {
    [CurrencyModalView.search]: { title: t('Select Token'), onBack: undefined },
    [CurrencyModalView.manage]: { title: t('Manage'), onBack: () => setModalView(CurrencyModalView.search) },
    [CurrencyModalView.importToken]: {
      title: t('Import Token'),
      onBack: () =>
        setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search),
    },
    [CurrencyModalView.importList]: { title: t('Import List'), onBack: () => setModalView(CurrencyModalView.search) },
  }
  const { isMobile } = useMatchBreakpoints()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(undefined)
  useEffect(() => {
    if (!wrapperRef.current) return
    setHeight(wrapperRef.current.offsetHeight - 330)
  }, [])

  return (
    <StyledModalContainer
      drag={isMobile ? 'y' : false}
      dragConstraints={{ top: 0, bottom: 600 }}
      dragElastic={{ top: 0 }}
      dragSnapToOrigin
      onDragStart={() => {
        if (wrapperRef.current) wrapperRef.current.style.animation = 'none'
      }}
      // @ts-ignore
      onDragEnd={(e, info) => {
        if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss) onDismiss()
      }}
      ref={wrapperRef}
    >
      <StyledModalHeader>
        <ModalTitle>
          {config[modalView].onBack && <ModalBackButton onBack={config[modalView].onBack} />}
          <Heading>{config[modalView].title}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </StyledModalHeader>
      <StyledModalBody>
        {modalView === CurrencyModalView.search ? (
          <CurrencySearch
            onCurrencySelect={handleCurrencySelect}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={showCommonBases}
            commonBasesType={commonBasesType}
            showImportView={() => setModalView(CurrencyModalView.importToken)}
            setImportToken={setImportToken}
            height={height}
            forLiquidity={forliquidity}
          />
        ) : modalView === CurrencyModalView.importToken && importToken ? (
          <ImportToken tokens={[importToken]} handleCurrencySelect={handleCurrencySelect} />
        ) : modalView === CurrencyModalView.importList && importList && listURL ? (
          <ImportList list={importList} listURL={listURL} onImport={() => setModalView(CurrencyModalView.manage)} />
        ) : modalView === CurrencyModalView.manage ? (
          <Manage
            setModalView={setModalView}
            setImportToken={setImportToken}
            setImportList={setImportList}
            setListUrl={setListUrl}
          />
        ) : (
          ''
        )}
        {/* {modalView === CurrencyModalView.search && (
          <Footer>
            <Button
              scale="sm"
              variant="text"
              onClick={() => setModalView(CurrencyModalView.manage)}
              className="list-token-manage-button"
            >
              {t('Manage Tokens')}
            </Button>
          </Footer>
        )} */}
      </StyledModalBody>
    </StyledModalContainer>
  )
}
