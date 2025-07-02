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
  width: fit-content;
  max-width: 250px;
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(5, minmax(0, 250px));
    place-items: center;
    place-content: center;
  }
`

const ReStyledMembersTwo = styled(StyledMembers)`
  margin: auto;
  // width: 1116px;
  max-width: 100%;
  gap: 15px;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(4, minmax(0, 250px));
    place-content: center;
    place-items: center;
  }
`

const ReStyledMembersThree = styled(Box)`
  margin: auto;
  width: 545.6px;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  place-content: center;
  place-items: center;
  gap: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    gap: 24px;
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

function MenberPC() {
  const { t } = useTranslation()

  const MEMBERS_ONE: Array<IMember> = [
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Livan G.M.png`,
      name: 'Livan G.M',
      position: t('Chief Executive Officer'),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Zayn.png`,
      name: 'Zayn',
      position: t('Chief Marketing Officer'),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Marcos.png`,
      name: 'Marcos N.',
      position: t('Chief Legal Officer'),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Edward.png`,
      name: 'Edward',
      position: t('Lead Designer'),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Kane Nguyen.png`,
      name: 'Kane Nguyen',
      position: t('Project Manager'),
    },
  ]
  const MEMBERS_TWO: Array<IMember> = [
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Victor Luu.png`,
      name: 'Victor Luu',
      position: t('SC Developer'),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Thomas Nguyen.png`,
      name: 'Thomas Nguyen',
      position: t('Lead FE Developer'),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Warren Vu.png`,
      name: 'Warren Vu',
      position: t('Lead BE Developer'),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Son Lee.png`,
      name: 'Son Lee',
      position: t('Operation Developer'),
    },
  ]

  const MEMBERS_THREE: Array<IMember> = [
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Mei To.png`,
      name: 'Mei To',
      position: t('Business Analyst'),
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/company/Marrie Vu.png`,
      name: 'Marrie Vu',
      position: t('Quality Control'),
    },
  ]
  return (
    <>
      <StyledMembers marginBottom={[64, null, null, 40]}>
        {MEMBERS_ONE.map((member, i) => (
          <CardMember member={member} key={String(i + member.name)} />
        ))}
      </StyledMembers>

      <Box marginBottom={[64, null, null, 40]}>
        <ReStyledMembersTwo marginBottom={[64, null, null, 100]}>
          {MEMBERS_TWO.map((member, i) => (
            <CardMember member={member} key={String(i + member.name)} />
          ))}
        </ReStyledMembersTwo>
      </Box>

      <Box marginBottom={[64, null, null, 100]}>
        <ReStyledMembersThree>
          {MEMBERS_THREE.map((member, i) => (
            <CardMember member={member} key={String(i + member.name)} />
          ))}
        </ReStyledMembersThree>
      </Box>
    </>
  )
}

export default MenberPC
