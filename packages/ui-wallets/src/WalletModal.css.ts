import { atoms } from '@pancakeswap/ui/css/atoms'
import { responsiveStyle } from '@pancakeswap/ui/css/responsiveStyle'
import { Flex } from '@pancakeswap/uikit'
import { style, keyframes } from '@vanilla-extract/css'

const promotedGradientKf = keyframes({
  '0%': {
    backgroundPosition: '50% 0%',
  },
  '50%': {
    backgroundPosition: '50% 100%',
  },
  '100%': {
    backgroundPosition: '50% 0%',
  },
})

export const promotedGradientClass = style([
  atoms({
    background: 'gradientBold',
  }),
  style({
    animation: `${promotedGradientKf} 3s ease infinite`,
    backgroundSize: '400% 400%',
  }),
])

export const modalWrapperClass = style([
  style({
    display: 'flex',
  }),
  responsiveStyle({
    xs: {
      width: '100%',
      marginBottom: 0,
    },
    md: {
      height: '490px',
    },
    lg: {
      width: '792px',
    },
  }),
])

export const desktopWalletSelectionClass = style({
  maxWidth: '100%',
})

export const walletSelectWrapperClass = style(
  responsiveStyle({
    xs: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      placeSelf: 'center',
      width: '100%',
    },
    sm: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      placeSelf: 'center',
      width: '100%',
    },
    lg: {
      placeSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
  }),
)

export const walletIconClass = style({
  width: '50px',
  height: '50px',
  borderRadius: '12px',
})
