import { Tooltip } from '@mui/material'

export const TooltipCustom = ({ children, title }: { children?: React.ReactElement; title: string }) => {
  return (
    <Tooltip
      title={title}
      placement="top"
      PopperProps={{
        sx: () => ({
          '& .MuiTooltip-tooltip': {
            border: '1px solid transparent',
            background: '#242424',
            color: 'rgba(255, 255, 255, 0.6) !important',
            fontSize: '14px !important',
            borderColor: 'rgba(220, 96, 50, 0.5)',
            backgroundClip: 'padding-box',
            borderRadius: '10px',
            position: 'relative',
            padding: '8px',
            fontWeight: '400',
            maxWidth: 'max-content',
            lineHeight: '17px',
          },
          '& .MuiTooltip-arrow': {
            color: '#242424',
          },
        }),
      }}
    >
      {children}
    </Tooltip>
  )
}
