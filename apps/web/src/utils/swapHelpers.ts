export type TSingleRoute = {
  pool: string
  tokenIn: string
  tokenOut: string
  limitReturnAmount: string
  swapAmount: string
  amountOut: string
  exchange: string
  poolLength: number
  poolType: string
  poolExtra: any
  extra: any
}

export type TSwapRoute = {
  addressIn: string
  addressOut: string
  routes: TSingleRoute[]
}

const isSameInOut = (a: TSwapRoute, b: TSingleRoute) => {
  return a.addressIn === b.tokenIn && a.addressOut === b.tokenOut
}

const positionToAdd = (swapRoutes: TSwapRoute[][], route: TSingleRoute[]): number => {
  let position = -1
  swapRoutes.forEach((swapRoute, index1) => {
    if (swapRoute.length === route.length && position === -1) {
      const isSame = route.reduce((s, r, index2) => s && isSameInOut(swapRoute[index2], r), true)
      if (isSame) {
        position = index1
      }
    }
  })
  return position
}

const addNewSwapRoute = (results: TSwapRoute[][], route: TSingleRoute[]) => {
  const result: TSwapRoute[] = route.map((r) => {
    const swapRoute: TSwapRoute = {
      addressIn: r.tokenIn,
      addressOut: r.tokenOut,
      routes: [r],
    }
    return swapRoute
  })

  results.push(result)
}

const updateSwapRoute = (results: TSwapRoute[][], route: TSingleRoute[], index) => {
  results[index].map((swapRoute: TSwapRoute, i: number) => {
    swapRoute.routes.push(route[i])
  })
}

export const buildRoutes = (routes: TSingleRoute[][]): TSwapRoute[][] => {
  if (!routes) return []

  const results: TSwapRoute[][] = []

  routes.map((route) => {
    const index = positionToAdd(results, route)
    if (index > -1) {
      updateSwapRoute(results, route, index)
    } else {
      addNewSwapRoute(results, route)
    }
  })

  return results
}
