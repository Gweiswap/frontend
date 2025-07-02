import { Box } from '@mui/system'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { CardMember, IMember } from './MenberPC'

const StyledMembersOne = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
  margin-bottom: 100px;
  place-items: center;
  place-content: center;

  div:last-child {
    grid-column-start: span 2;
    width: calc(50% - 7px);
  }
`

function MenberMobile() {
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
      <StyledMembersOne>
        {MEMBERS_ONE.map((member, i) => (
          <CardMember member={member} key={String(i + member.name)} />
        ))}
      </StyledMembersOne>
    </>
  )
}

export default MenberMobile
