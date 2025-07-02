/* eslint-disable import/extensions */
import { SxProps } from '@mui/material'
import NumberFormat from 'react-number-format'
import { AppInput } from '../AppInput'
import { NumberFormatProps, NumberFormatValues, SourceInfo } from './AppInputAmount'

// interface AppInputAmount extends Omit<NumberFormatProps, 'size'> {
export interface AppInputAmountProps extends Omit<NumberFormatProps, 'size'> {
  size?: 'small' | 'medium' | undefined
  sx?: SxProps
  className?: string
  onChangeValue?: (value: string, floatValue: number | undefined) => void
}

export function AppInputAmountHub({
  decimalScale = 5, // Default
  onChangeValue,
  onValueChange,
  ...props
}: AppInputAmountProps) {
  return (
    <NumberFormat
      customInput={AppInput}
      thousandsGroupStyle="thousand"
      prefix=""
      decimalSeparator="."
      displayType="input"
      type="text"
      thousandSeparator
      allowNegative={false}
      decimalScale={decimalScale}
      onValueChange={(values: NumberFormatValues, sourceInfo: SourceInfo) => {
        onValueChange?.(values, sourceInfo)
        onChangeValue?.(values.value, values.floatValue)
      }}
      {...props}
      // decimalScale={Number(allLimit?.[asset]?.amount_precision)}
    />
  )
}
