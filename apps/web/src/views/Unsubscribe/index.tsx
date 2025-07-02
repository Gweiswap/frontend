import { LogoWithTextIcon } from '@pancakeswap/uikit'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const DivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  background: black;

  .main_container {
    display: flex;
    flex-direction: column;
  }

  svg {
    margin: 50px auto;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: white;
    width: 700px;
    max-width: 100%;
    text-align: left;
  }
`

const UnsubscribePage = () => {
  const router = useRouter()
  const { email } = router.query
  const handleUnsubscribe = async () => {
    const decodedEmail = decodeURIComponent(email.toString())
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/unsubscribe`, { emailHash: decodedEmail })
      .then((error) => console.log(error))
  }
  useEffect(() => {
    if (email) handleUnsubscribe()
  }, [email])

  return (
    <DivWrapper>
      <div className="main_container">
        {/* <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/unsubscribe/success.png`} alt="success" /> */}
        <LogoWithTextIcon />
        <p>
          Dear User
          <br />
          <br />
          We hope this message finds you well. We received your subscription to the XOX Labs Ecosystem newsletter, and
          we appreciate your interest in staying updated on the latest developments and innovations in the XOX Labs
          protocol and decentralized finance (DeFi) space. However, we understand that preferences may change over time,
          and we respect your decision to unsubscribe.
          <br />
          <br />
          Based on your previous request to unsubscribe, we have removed your email address from our mailing list. You
          will no longer receive any further communications from us.
          <br />
          <br />
          We genuinely value your engagement and interest in the XOX Labs DeFi Ecosystem, and we would like to thank you
          for your past support. If you have any feedback or suggestions on how we can improve our newsletter or any
          other aspect of our ecosystem, we would be delighted to hear from you.
          <br />
          <br />
          Once again, we appreciate your time and interest in our newsletter. Should you have any future inquiries or
          wish to resubscribe, please don't hesitate to reach out to us.
          <br />
          <br />
          Best regards,
          <br />
          <br />
          The XOX Labs Team
          <br />
          <br />
        </p>
      </div>
    </DivWrapper>
  )
}

export default UnsubscribePage
