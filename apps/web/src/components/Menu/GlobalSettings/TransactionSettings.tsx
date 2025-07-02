import { useState } from 'react'
import { escapeRegExp } from 'utils'
import { Text, Button, Input, Flex, Box, QuestionHelper, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useUserSlippageTolerance, useUserTransactionTTL } from 'state/user/hooks'
import styled from 'styled-components'

const IconPercent = styled.span`
  position: absolute;
  color: #f4eeff;
  right: -5px;
  top: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 425px) {
    font-size: 14px;
  }
`
const SettingButton = styled(Button)`
  background: unset;
  border: 1px solid #444444;
  padding: 12px 11px;
  font-size: 16px;
  min-height: 43px;
  font-weight: 400;
  &.active {
    border: 1px solid #fb8618;
  }

  @media screen and (max-width: 425px) {
    padding: 10px 9px;
    font-size: 14px;
    min-height: 37px;
    margin-right: 14px;
  }
`
const SettingInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid #444444;
  background: unset;
  min-height: 43px;
  padding: 0 9px;
  width: 60px;
  &.active {
    border: 1px solid #fb8618;
  }
  &:focus {
    border: 1px solid #fb8618 !important;
    box-shadow: none !important;
  }

  @media screen and (max-width: 425px) {
    border-radius: 6px;
    padding: 10px 9px;
    font-size: 14px;
    width: 49px;
    min-height: 37px;
  }
`
const MinsInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid #444444;
  background: unset;
  min-height: 43px;
  width: 62px;
  padding: 0 0 0 20px;
  &.active {
    border: 1px solid #fb8618;
  }

  &:focus {
    border: 1px solid #fb8618 !important;
    box-shadow: none !important;
  }

  @media screen and (max-width: 425px) {
    border-radius: 6px;
    padding: 10px 9px;
    font-size: 14px;
    width: 49px;
    min-height: 37px;
  }
`
const SettingBox = styled(Box)`
  width: 76px;
  @media screen and (max-width: 425px) {
    width: 53px;
  }
`
enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
const THREE_DAYS_IN_SECONDS = 60 * 60 * 24 * 3

const SlippageTabs = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')
  const { isMobile } = useMatchBreakpoints()

  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    if (value === '' || inputRegex.test(escapeRegExp(value))) {
      setSlippageInput(value)

      try {
        const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
        if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
          setUserSlippageTolerance(valueAsIntFromRoundedFloat)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 60 && valueAsInt < THREE_DAYS_IN_SECONDS) {
        setTtl(valueAsInt)
      } else {
        deadlineError = DeadlineError.InvalidInput
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="24px">
        <Flex mb="12px">
          <Text color="#FFFFFFDE">{t('Slippage Tolerance')}</Text>
          <QuestionHelper
            text={t(
              'Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution.',
            )}
            placement="top-start"
            ml="4px"
          />
        </Flex>
        <Flex flexWrap="wrap">
          <SettingButton
            mt="4px"
            mr="16px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(10)
            }}
            className={userSlippageTolerance === 10 ? 'active' : ''}
          >
            0.1%
          </SettingButton>
          <SettingButton
            mt="4px"
            mr="16px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(50)
            }}
            className={userSlippageTolerance === 50 ? 'active' : ''}
          >
            0.5%
          </SettingButton>
          <SettingButton
            mr="16px"
            mt="4px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(100)
            }}
            className={userSlippageTolerance === 100 ? 'active' : ''}
          >
            1.0%
          </SettingButton>

          <Flex alignItems="center">
            <SettingBox mt="4px">
              <SettingInput
                scale="sm"
                inputMode="decimal"
                pattern="^[0-9]*[.,]?[0-9]{0,2}$"
                placeholder={(userSlippageTolerance / 100).toFixed(2)}
                value={slippageInput}
                onBlur={() => {
                  parseCustomSlippage((userSlippageTolerance / 100).toFixed(2))
                }}
                onChange={(event) => {
                  if (event.currentTarget.validity.valid) {
                    parseCustomSlippage(event.target.value.replace(/,/g, '.'))
                  }
                }}
                isWarning={!slippageInputIsValid}
                // isSuccess={![10, 50, 100].includes(userSlippageTolerance)}
                className={![10, 50, 100].includes(userSlippageTolerance) ? 'active' : ''}
              />
            </SettingBox>
            <Text color="#fb8618" bold ml="2px">
              %
            </Text>
          </Flex>
        </Flex>
        {!!slippageError && (
          <Text fontSize="14px" color={slippageError === SlippageError.InvalidInput ? '#F44336' : '#F3841E'} mt="16px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Text>
        )}
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Flex alignItems="center">
          <Text color="#FFFFFFDE">{t('Tx deadline (mins)')}</Text>
          <QuestionHelper
            text={t('Your transaction will revert if it is left confirming for longer than this time.')}
            placement="top-start"
            ml="4px"
          />
        </Flex>
        <Flex>
          <Box width={isMobile ? '45px' : '52px'} mt="4px" style={{ position: 'relative' }}>
            <MinsInput
              scale="sm"
              inputMode="numeric"
              pattern="^[0-9]+$"
              isWarning={!!deadlineError}
              onBlur={() => {
                parseCustomDeadline((ttl / 60).toString())
              }}
              placeholder={(ttl / 60).toString()}
              value={deadlineInput}
              onChange={(event) => {
                if (event.currentTarget.validity.valid) {
                  parseCustomDeadline(event.target.value)
                }
              }}
              style={isMobile ? { marginLeft: '-10px' } : {}}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SlippageTabs
