import React from 'react'
import Image from 'next/image'

const EnglishIcon: React.FC<React.PropsWithChildren> = () => {
  return (
    <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image src={`/images/English.svg`} alt="English" width={19} height={19} />
    </div>
  )
}

export default EnglishIcon
