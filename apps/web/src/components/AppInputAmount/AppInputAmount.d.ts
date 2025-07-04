// exclude types from the InputHTMLAttributes
const { ...inputAttributes }: React.InputHTMLAttributes<HTMLInputElement>
type InputAttributes = typeof inputAttributes

export interface NumberFormatState {
  value?: string
  numAsString?: string
}

export interface NumberFormatValues {
  floatValue: number | undefined
  formattedValue: string
  value: string
}

export interface SourceInfo {
  event: SyntheticInputEvent
  source: 'prop' | 'event'
}

export type FormatInputValueFunction = (inputValue: string) => string

export interface SyntheticInputEvent extends React.SyntheticEvent<HTMLInputElement> {
  readonly target: HTMLInputElement
  data: any
}

export interface NumberFormatPropsBase extends InputAttributes {
  thousandSeparator?: boolean | string
  decimalSeparator?: string
  thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan'
  decimalScale?: number
  fixedDecimalScale?: boolean
  displayType?: 'input' | 'text'
  prefix?: string
  suffix?: string
  format?: string | FormatInputValueFunction
  removeFormatting?: (formattedValue: string) => string
  mask?: string | string[]
  value?: number | string | null
  defaultValue?: number | string
  isNumericString?: boolean
  customInput?: React.ComponentType<any>
  allowNegative?: boolean
  allowEmptyFormatting?: boolean
  allowLeadingZeros?: boolean
  onValueChange?: (values: NumberFormatValues, sourceInfo: SourceInfo) => void
  /**
   * these are already included in React.HTMLAttributes<HTMLInputElement>
   * onKeyDown: Function;
   * onMouseUp: Function;
   * onChange: Function;
   * onFocus: Function;
   * onBlur: Function;
   */
  type?: 'text' | 'tel' | 'password'
  isAllowed?: (values: NumberFormatValues) => boolean
  renderText?: (formattedValue: string) => React.ReactNode
  getInputRef?: ((el: HTMLInputElement) => void) | React.Ref<any>
  allowedDecimalSeparators?: Array<string>
  customNumerals?: [string, string, string, string, string, string, string, string, string, string]
}

// The index signature allows any prop to be passed in, such as if wanting to send props
// to a customInput. We export this as a separate interface to allow client authors to
// choose the stricter typing of NumberFormatPropsBase if desired.
export interface NumberFormatProps extends NumberFormatPropsBase {
  [key: string]: any
}
