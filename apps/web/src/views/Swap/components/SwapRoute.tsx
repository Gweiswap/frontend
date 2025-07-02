import { Fragment, memo } from 'react'
import { Trade, Currency, TradeType } from '@pancakeswap/sdk'
import { Text, Flex, ChevronRightIcon } from '@pancakeswap/uikit'
import { unwrappedToken } from 'utils/wrappedCurrency'

export default memo(function SwapRoute({ trade }: { trade: Trade<Currency, Currency, TradeType> }) {
  return (
    <Flex flexWrap="wrap" width="100%" justifyContent="flex-end" alignItems="center">
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        const currency = unwrappedToken(token)
        return (
          <Fragment key={token.address}>
            <Flex alignItems="end">
              <Text fontSize="16px" ml="0.125rem" mr="0.125rem" color="while87">
                {currency.symbol}
              </Text>
            </Flex>
            {!isLastItem && <ChevronRightIcon width="22px" color="#515151" />}
          </Fragment>
        )
      })}
    </Flex>
  )
})
