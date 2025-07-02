import { Tooltip } from '@mui/material'
import { formatBalance, formatBalanceComma } from '@pancakeswap/utils/formatBalance'

interface IProps {
  balance: string | number
  unit?: string
  name?: string
  notSpace?: boolean
}

export const ShowBalance = ({ balance, unit = '', name = 'default', notSpace = false }: IProps) => {
  const data = parseFloat(String(balance))

  return (
    <>
      {Number(balance) <= 0.000001 ? (
        name === 'liquidity' ? (
          <Tooltip title={Number(balance) ? `$${data}` : null} placement="top-start">
            <span className="liquidity value">${Number(balance) ? '0.000000...' : 0}</span>
          </Tooltip>
        ) : (
          <Tooltip
            title={Number(balance) ? (!notSpace ? `${data} ${unit}` : `${data}${unit}`) : null}
            placement="top-start"
          >
            <p style={{ display: 'flex' }}>
              <span className="value">{Number(balance) ? '0.000000...' : 0}</span>
              {!notSpace && <span>&nbsp;</span>}
              <span className="value">{unit}</span>
            </p>
          </Tooltip>
        )
      ) : data.toString().length <= 10 ? (
        <>
          <p style={{ display: 'flex' }}>
            <span className="value">
              {Number(balance) ? formatBalance(String(balance)) : `${name === 'liquidity' ? '$0' : '0'}`}
            </span>
            {!notSpace && <span>&nbsp;</span>}
            <span className="value">{unit}</span>
          </p>
        </>
      ) : name === 'liquidity' ? (
        <Tooltip title={Number(balance) ? `$${data}` : null} placement="top-start">
          <span className="liquidity value">${Number(balance) ? formatBalanceComma(String(balance)) : '0'}</span>
        </Tooltip>
      ) : (
        <Tooltip
          title={Number(balance) ? (!notSpace ? `${data} ${unit}` : `${data}${unit}`) : null}
          placement="top-start"
        >
          <p style={{ display: 'flex' }}>
            <span className="value">{Number(balance) ? formatBalanceComma(String(balance)) : '0'}</span>
            {!notSpace && <span>&nbsp;</span>}
            <span className="value">{unit}</span>
          </p>
        </Tooltip>
      )}
    </>
  )
}

export default ShowBalance
