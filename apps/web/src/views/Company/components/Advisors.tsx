import { useTranslation } from '@pancakeswap/localization'
import { Box } from '@pancakeswap/uikit'
import styled from 'styled-components'

export interface IMember {
  avatar: string
  name: string
  position: string
}

const StyledCard = styled('div')`
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  height: 100%;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-width: 1px;
    border-radius: inherit;
    border-color: white;
    border-style: solid;
    mask: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
  }
`

const StyledCardMember = styled(StyledCard)`
  text-align: center;
  padding: 24px 28px;

  > img {
    margin-bottom: 24px;
  }

  > h4 {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const StyledMembers = styled(Box)`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 250px));
  place-items: center;
  place-content: center;
  gap: 15px;
  margin-bottom: 100px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, minmax(0, 250px));
    gap: 24px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(2, minmax(0, 250px));
  }
`

export function CardMember({ member, ...props }: { member: IMember }) {
  return (
    <StyledCardMember {...props}>
      <img src={member.avatar} alt="" draggable="false" loading="lazy" />
      <h4>{member.name}</h4>
      <p>{member.position}</p>
    </StyledCardMember>
  )
}

function Advisors() {
  const { t } = useTranslation()

  const Advisors: Array<IMember> = [
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/rectangle-3232.png`,
      name: 'Nicky Chalabi',
      position: t(
        'Previously responsible for Growth and Ecosystem Development at NEAR Foundation. Currently leading partnerships at Neon Labs, entity behind development of Neon EVM, first and only EVM on Solana.',
      ),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/rectangle-3231.png`,
      name: 'Tran Huu Hung',
      position: t('BDM at Kyber Network - Strategic advisor for XOX Labs'),
    },
  ]

  return (
    <>
      <StyledMembers marginBottom={[64, null, null, 40]}>
        {Advisors.map((member, i) => (
          <CardMember member={member} key={String(i + member.name)} />
        ))}
      </StyledMembers>
    </>
  )
}

export default Advisors
