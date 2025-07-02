/* eslint-disable react/no-unknown-property */
import React from 'react'
import Image from 'next/image'

const VietNamIcon: React.FC<React.PropsWithChildren> = () => {
  return (
    <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image src={`/images/Vietnamese.svg`} alt="Vietnamese" width={19} height={19} />
    </div>
  )
}

export default VietNamIcon
