import { Avatar, Box, Tooltip } from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'
import useWindowSize from 'hooks/useWindowSize'
import { useCallback } from 'react'
import styled from 'styled-components'
import { shortenAddress } from 'utils/shortenAddress'
// eslint-disable-next-line import/no-cycle

export interface IMappingFormat {
  address: string
  amount: string
  avatar: string
  id: string
  point: number | null
  rank: number | null
  username: string
}

interface IProps {
  item: IMappingFormat
  mb?: boolean
}

const Wrapper = styled(Box)`
  .item_ranking {
    display: flex;
    align-items: center;

    .ranking_top {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 60px;
      margin-right: 16px;

      @media screen and (max-width: 900px) {
        width: 40px;
        height: 40px;
        min-width: 40px;
        margin-right: 8px;
      }
    }

    .ranking {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
      min-width: 60px;
      margin-right: 16px;

      @media screen and (max-width: 900px) {
        width: 40px;
        height: 40px;
        min-width: 40px;
        font-size: 14px;
        line-height: 17px;
        margin-right: 8px;
      }
    }

    .user_info {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px 40px 10px 10px;
      border-radius: 60px;
      align-items: center;

      .user_avatar_name {
        display: flex;
        align-items: center;

        .ranking_name {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: #424242;
          margin-left: 8px;

          @media screen and (max-width: 900px) {
            font-size: 14px;
            line-height: 17px;
          }
        }
        .name {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.87);
          margin-left: 8px;

          @media screen and (max-width: 900px) {
            font-size: 14px;
            line-height: 17px;
          }
        }
      }

      .point {
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        text-align: right;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        @media screen and (max-width: 900px) {
          font-size: 14px;
          line-height: 17px;
        }
      }

      @media screen and (max-width: 900px) {
        padding: 8px 12px 8px 8px;
      }
    }

    .bg_white {
      background: #ffffff;
    }

    .bg_rba {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`

const LeaderBoardItemLP = (props: IProps): JSX.Element => {
  const { item, mb = true } = props
  const ranking: Array<number> = [1, 2, 3]
  const { width } = useWindowSize()
  const { isMobile } = useMatchBreakpoints()

  const renderRanking = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (rank: number) => {
      if (ranking.includes(rank)) {
        return (
          <div className="ranking_top">
            {width <= 900 ? (
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/r_mb_${rank}.svg`} alt="ranking" />
            ) : (
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/r${rank}.svg`} alt="ranking" />
            )}
          </div>
        )
      }

      return <div className="ranking">{rank}</div>
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <Wrapper sx={{ marginBottom: `${mb ? `16px` : ''}` }}>
      <div className="item_ranking">
        {renderRanking(item.rank)}

        <div className={`${ranking.includes(item.rank) ? `bg_white` : `bg_rba`} user_info`}>
          <div className="user_avatar_name">
            <Avatar alt="Remy Sharp" src={item.avatar} sx={{ height: isMobile ? 24 : 40, width: isMobile ? 24 : 40 }} />
            <Tooltip title={item.username}>
              <p className={`${ranking.includes(item.rank) ? `ranking_name` : `name`}`}>
                {item.username
                  ? item.username?.length > 9
                    ? `${item.username.substring(0, 7)}...${item.username.substring(item.username.length - 2)}`
                    : item.username
                  : shortenAddress(item.address)}
              </p>
            </Tooltip>
          </div>
          <div className="point">{formatAmountNumber(item.point, 2)}</div>
        </div>
      </div>
    </Wrapper>
  )
}

export default LeaderBoardItemLP
