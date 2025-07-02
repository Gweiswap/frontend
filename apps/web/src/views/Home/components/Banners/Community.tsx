import { useTranslation } from '@pancakeswap/localization'
import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

interface IItemListCommunity {
  icon: string
  name: string
  des: string
  iconMobile?: string
  href: string
}

interface Iprops {
  item: IItemListCommunity
}

const Wrapper = styled.div`
  margin-top: 100px;
  .main_container {
    display: flex;
    justify-content: center;
  }
  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 48px;
    row-gap: 40px;

    .item_container {
      padding: 24px 32px;
      display: flex;
      /* justify-content: space-between; */
      align-items: center;
      background: rgba(16, 16, 16, 0.3);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        padding: 1px;
        z-index: -1;
        background: linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.2) 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        -webkit-mask-composite: exclude;
        -webkit-mask-composite: exclude;
        mask-composite: exclude;
    }
      }

      .icon-container {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%);
        padding: 1px;
        cursor: pointer;

        @media screen and (max-width: 576px) {
          border: 1px solid #FFFFFF;
          background: unset;
        }
      }
      .icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #242424;
      }

      .overlay {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(16, 16, 16, 1);
      }

      .name {
        font-weight: 700;
        font-size: 20px;
        color: #ffffff;
        margin-bottom: 16px;
      }

      .des {
        font-weight: 400;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.6);
        line-height: 24px;
      }
    }

    @media screen and (max-width: 900px) {
      column-gap: 24px;
      row-gap: 23px;

      .item_container {
        padding: 24px 14px;
        .icon-container {
          width: 60px;
          height: 60px;
        }

        .name_mobile {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
      }
    }
  }

  .title {
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: #FB8618;
    margin-bottom: 48px;
  }

  .privacy-link {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.87);
    span {
      up-icon {
        &:hover {
          -webkit-transition: 0.5s ease;
          transition: 0.5s ease;
          left: 6px;
          bottom: 5px;
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 20px;
    }

    .decoration {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
    }

    .wrapper_mobile {
      width: 100%;
      cursor: pointer;
      .name_mobile {
        text-align: center;
        margin-top: 16px;
      }
      .icon-container_moblie {
        justify-content: center;
        display: flex;
      }
    }
  }
`

const CommunityItem = ({ item }: Iprops) => {
  const { t } = useTranslation()
  const { width } = useWindowSize()

  return (
    <a href={item.href} target="_blank">
      <div className="item_container" data-aos="fade-up">
        <div className="wrapper_mobile">
          <div className="icon-container_moblie">
            <div className="icon-container">
              <div className="icon">
                <div className="overlay">
                  <img src={width < 900 ? item.iconMobile : item.icon} alt="icon" />
                </div>
              </div>
            </div>
          </div>
          {width < 900 && <div className="name_mobile">{t(item.name)}</div>}
        </div>
        {width > 900 && (
          <div style={{ marginLeft: 24 }}>
            <p className="name">{t(item.name)}</p>
            <ul>
              <li className="des">{t(item.des)}</li>
            </ul>
          </div>
        )}
      </div>
    </a>
  )
}

const SupportedBlockchains = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <div className="title" data-aos="fade-up">
        {t('Meet the worldwide community')}
        <span style={{ color: '#FB8618' }}>.</span>
      </div>
      <p className="decoration" data-aos="fade-up" data-aos-duration="2300">
        {t('We are supported by many people. Why don’t you join them?')}
      </p>
      <div className="main_container">
        <div className="main">
          {listCommunity.map((item: IItemListCommunity) => {
            return <CommunityItem item={item} key={item.name} />
          })}
        </div>
      </div>
    </Wrapper>
  )
}

const listCommunity = [
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/pc_twitter.svg`,
    name: 'Twitter',
    des: 'Follow @Xox_Labs on Twitter for ecosystem news & updates. Stay informed.',
    iconMobile: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/twitter_mob.svg`,
    href: 'https://twitter.com/Xox_Labs',
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/group_telegram.svg`,
    name: 'Telegram Group',
    des: 'Ask general questions and chat with the worldwide community on Telegram.',
    iconMobile: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/group_tele_mb.svg`,
    href: 'https://t.me/xoxlabsofficial',
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/pc_tiktok.svg`,
    name: 'Tiktok',
    des: 'Follow @xox_labs on TikTok for the latest ecosystem news. Stay connected!',
    iconMobile: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tiktok_mb.svg`,
    href: 'https://www.tiktok.com/@xox_labs',
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/telegram_channel.svg`,
    name: 'Telegram Channel',
    des: 'Join our channel to stay up-to-date with every news and updates.',
    iconMobile: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/telegram_mb.svg`,
    href: 'https://t.me/xoxlabsofficialchannel',
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/pc_youtube.svg`,
    name: 'Youtube',
    des: 'Subscribe to @XoxLabs to stay in the loop and updated.',
    iconMobile: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/youtube_mb.svg`,
    href: 'https://www.youtube.com/@XoxLabs',
  },
  {
    icon: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/pc_discord.svg`,
    name: 'Discord',
    des: 'Ask general questions and chat with the worldwide community on Discord.',
    iconMobile: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/discord_mb.svg`,
    href: 'https://discord.gg/xoxlabs',
  },
]

export default SupportedBlockchains
