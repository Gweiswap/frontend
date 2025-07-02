import { Box, BoxProps } from '@pancakeswap/uikit'

const Container: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...props }) => (
  <Box
    px={['16px', '16px', '0px', '0px']}
    mx="auto"
    // maxWidth="1200px"
    {...props}
  >
    {children}
  </Box>
)

export default Container
