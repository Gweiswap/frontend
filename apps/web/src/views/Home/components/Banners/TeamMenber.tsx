import styled from 'styled-components'

interface IItemMember {
  avatar: string
  name: string
  major: string
  describe: string
}

interface IProps {
  item: IItemMember
}

const Wrapper = styled.div`
  .main {
    display: flex;
    justify-content: space-between;
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
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;
  }
`

const WrapperTeamItem = styled.div`
  position: relative;
  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(179.93deg, rgba(0, 0, 0, 0) 0.06%, #000000 99.94%);
    border-radius: 10px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      color: rgba(255, 255, 255, 0.87);
      font-weight: 700;
      font-size: 20px;
    }

    .major {
      color: #9072ff;
      font-weight: 400;
      font-size: 20px;
    }

    .describe {
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
      font-size: 14px;
    }
  }
`

const TeamMenberItem = ({ item }: IProps): JSX.Element => {
  return (
    <WrapperTeamItem>
      <img src={item.avatar} alt="avatar" />
      <div className="overlay">
        <div>{null}</div>
        <div>
          <div className="name">{item.name}</div>
          <div className="major">{item.major}</div>
          <p className="describe">{item.describe}</p>
        </div>
      </div>
    </WrapperTeamItem>
  )
}

const TeamMenber = (): JSX.Element => {
  return (
    <Wrapper>
      <div className="main">
        {listMember.map((item: IItemMember) => {
          return <TeamMenberItem item={item} />
        })}
      </div>
    </Wrapper>
  )
}

const listMember = [
  {
    avatar: `/images/m3.svg`,
    name: 'Cameron Williamson',
    major: 'CEO & Co-Founder',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    avatar: `/images/m2.svg`,
    name: 'Cameron Williamson',
    major: 'Art Director',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    avatar: `/images/m1.svg`,
    name: 'Cameron Williamson',
    major: 'CTO',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    avatar: `/images/m1.svg`,
    name: 'Cameron Williamson',
    major: 'CTO',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
  },
]

export default TeamMenber
