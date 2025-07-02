import { InputBase, InputBaseProps } from '@mui/material'
import React from 'react'

export interface AppInputProps extends Omit<InputBaseProps, 'errors'> {
  variant?: 'search' | 'normal'
  errors?: string | null | boolean
}

export const AppInput = React.forwardRef(function AppInput(
  { sx, fullWidth, variant = 'normal', ...props }: AppInputProps,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  return (
    <>
      <InputBase
        ref={ref}
        fullWidth={fullWidth}
        sx={{
          border: `none`,
          borderRadius: '12px',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '0.2s',
          '&:hover': {
            borderColor: 'white',
          },
          '&:focus-within': {
            borderColor: 'white',
          },
          caretColor: 'rgba(255, 255, 255, 0.87)',

          '& .MuiInputBase-input': {
            position: 'relative',
            padding: '0',
            typography: 'label',
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.38)',
              opacity: 1,
            },
          },
          ...sx,
        }}
        {...props}
      />
    </>
  )
})
