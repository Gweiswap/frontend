/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
import styled from 'styled-components'
import { listRoadMap } from './RoadMap'

const Wrapper = styled.div`
  margin: 40px auto 0;
  .item_container {
    height: 250px;
    overflow: hidden;
    display: flex;
    position: relative;
    .line_milestone {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        z-index: 1;
      }
    }
    .title {
      font-weight: 700;
      font-size: 20px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 16px;
    }

    .describe {
      font-weight: 400;
      font-size: 16px;
      line-height: 160%;
      color: #f2f2f2;
      overflow-wrap: break-word;
      width: 220px;
    }

    .item_main_content {
      & > div:nth-child(2) {
        margin: 16px 0px;
      }
      .entry {
        display: flex;
        & > div:first-child {
          margin-right: 15px;
        }
      }
    }

    .icon_stone {
      margin-top: 6px;
    }

    .time {
      color: #9072ff;
    }

    .title_content {
      margin-left: 40px;
      margin-bottom: 40px;
    }

    .margin_top {
      margin-top: 30px;
    }

    &::before {
      content: '';
      height: 2px;
      width: 36px;
      background: linear-gradient(0deg, #000000 0%, #fb8618 100%);
      position: absolute;
      left: 6%;
      top: 4%;
    }
  }

  .child_1_th {
    margin-left: -9px;
  }

  .child_2_th {
    margin-left: -9px;
  }

  .child_3_th {
    margin-left: -16.5px;

    .title_content {
      margin-top: 7px;
    }
    &::before {
      top: 7%;
      left: 9.5%;
    }

    .title_content {
      margin-left: 33px;
      margin-bottom: 40px;
    }

    .line_status_mb {
      border-left: unset;
      border-width: 2.7px;
      border-style: solid;
      border-image: linear-gradient(to bottom, rgba(155, 243, 203, 1) 0%, rgba(62, 192, 166, 1) 100%) 1;
    }
  }

  .child_4_th {
    margin-left: -9px;
    .line_status_mb {
      border-left: unset;
      border-width: 2.7px;
      border-style: solid;
      border-image: linear-gradient(to bottom, rgba(62, 192, 166, 1) 0%, rgba(244, 66, 52, 1) 100%) 1;
    }
  }
  .child_5_th {
    margin-left: -9px;
    .line_status_mb {
      border-left: unset;
      border-width: 2.7px;
      border-style: solid;
      border-image: linear-gradient(to bottom, rgba(244, 66, 52, 1) 0%, rgba(159, 58, 131, 1) 100%) 1;
    }
  }
`

const LineNotDash = styled.div`
  height: 100%;
  border-left: 2.7px solid #9072ff;
`

const RoadMapMobile = () => {
  return (
    <Wrapper>
      <div className="main_content">
        {listRoadMap.map((item, index) => {
          return (
            <div
              className={`item_container child_${index + 1}_th`}
              key={`${item.year}_parent_${index + 1}`}
              data-aos="fade-left"
            >
              <div className="line_milestone">
                {item.status === 'done' ? (
                  <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/done_mobile.svg`} alt="milestone" />
                ) : item.status === 'processing' ? (
                  <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/now_done_mobile.svg`} alt="milestone" />
                ) : (
                  <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/not_done_mobile.svg`} alt="milestone" />
                )}

                {item.status === 'done' ? (
                  <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/line_dash.svg`} alt="milestone" />
                ) : (
                  <LineNotDash className="line_status_mb" />
                )}
              </div>

              <div className="title_content">
                <div className="title">{item.year}</div>

                <div className="item_main_content">
                  {Array.from(item.describe).map((entry) => {
                    return (
                      <div className="entry" key={entry}>
                        <div>
                          <img
                            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/icon-stone.svg`}
                            alt="icon-stone"
                            className="icon_stone"
                          />
                        </div>
                        <div className="describe">{entry}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default RoadMapMobile
