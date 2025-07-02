import styled from 'styled-components'
import React, { useState, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Button, Text, useToast } from '@pancakeswap/uikit'
import axios from 'axios'
import { useSigner, useAccount } from 'wagmi'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import { updateOpenFormReferral, updateUserProfile, updateUserProfileEdit } from 'state/user/actions'
import { useRouter } from 'next/router'
import { useTranslation } from '@pancakeswap/localization'

const ModalStyle = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`

const FormWrapper = styled.div`
  width: calc(100vw - 48px);
  max-width: 464px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;

  background: #101010;

  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  & > button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
    padding: 0;
  }

  & > button:disabled {
    color: rgba(66, 66, 66, 0.38);
    background-color: #eeeeee;
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    .form__error-message,
    .form__error-message-avata {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #f44336;
      margin-top: 8px;
    }

    .form__error-message-avata {
      text-align: center;
    }
    .error {
      border-color: #f44336;
      background-color: #342120;
    }
  }

  & > div.avatar {
    display: grid;
    place-content: center;
    margin-bottom: 24px;

    label {
      position: relative;
      width: fit-content;
      display: block;
      margin: auto;
      cursor: pointer;

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
      }

      svg:last-child {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }

  .btns {
    button {
      @media (max-width: 576px) {
        font-size: 14px;
      }
    }
  }
`

const FormLabel = styled.label`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;

  & > span {
    color: #ff7070;
  }

  @media (max-width: 576px) {
    font-size: 12px;
  }
`

const FormInput = styled.input`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);

  padding: 12px 14px;
  width: 100%;
  max-width: 416px;
  height: 43px;
  border: 1px solid #444444;
  border-radius: 6px;
  background: transparent;
  outline: none;

  &:place-holder {
    color: rgba(255, 255, 255, 0.38);
  }
  &:focus {
    border-color: #c20da3;
    caret-color: #c20da3;
  }
  @media (max-width: 576px) {
    font-size: 14px;
  }
`

const SuccessModal = styled.div`
  width: 337px;
  z-index: 1;
  background: #242424;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 32px 24px;
  position: relative;

  & > button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
    padding: 0;
  }

  & > button:disabled {
    color: rgba(66, 66, 66, 0.38);
    background-color: #eeeeee;
  }
`

const FormReferralModal = (_, ref) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [telegram, setTelegram] = useState('')
  const [avatar, setAvata] = useState<any>()
  const [isSubmiting, setSubmitting] = useState(false)
  const [errorMessages, setErrorMessages] = useState<any>({})
  const [profileSuccess, setProfileSuccess] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<boolean>(false)
  const { data: signer } = useSigner()
  const { address: account } = useAccount()
  const [isSaveable, setSaveable] = useState(false)
  const { t } = useTranslation()

  const { toastSuccess } = useToast()

  const modalElement = document.getElementById('modal-root')

  const { openFormReferral, userProfileEdit: userProfile } = useSelector<AppState, AppState['user']>(
    (state) => state.user,
  )

  const setOpenFormReferral = (open: boolean) => {
    dispatch(updateOpenFormReferral({ openFormReferral: open }))
  }

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpenFormReferral(true),
      close: () => setOpenFormReferral(false),
    }),
    [],
  )

  const handleUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9A-Za-z]*$/.test(e.target.value)) {
      setUsername(e.target.value)
    }
  }, [])

  const onChangeAvata = useCallback(
    (e: any) => {
      const img = e.target.files[0]
      setAvata(img)

      const error = { ...errorMessages }
      delete error.avatar

      if (
        img &&
        (img.size / 1024 / 1024 > 5 ||
          (img.type !== 'image/jpeg' && img.type !== 'image/jpg' && img.type !== 'image/png'))
      ) {
        error.avatar = t(
          'Error: Your image could not be uploaded. Images should be less than or equal to 5 MB and saved as PNG, JPG, JPEG files.',
        )
      }
      setErrorMessages(error)
    },
    [errorMessages],
  )

  const handleRenderUserName = async (accountId) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/users/${accountId}/add-new`, {
        address: accountId,
      })
      .then((res) => {
        handleGetProfile()
      })
      .catch((e) => console.warn(e))
  }

  const onCloseBtnClicked = useCallback(() => {
    setOpenFormReferral(false)
  }, [])

  const validateEmail = useCallback(() => {
    if (!email) return true

    // eslint-disable-next-line no-useless-escape
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
  }, [email])

  const isValid = useCallback(() => {
    const error: any = {}
    if (errorMessages.username === t('This username already exists.')) error.username = errorMessages.username
    if (errorMessages.avatar) error.avatar = errorMessages.avatar
    setUsername(username?.trim())

    if (!username.replaceAll(' ', '')) error.username = t('This field is required.')

    if (!validateEmail()) {
      error.email = t('Invalid email address.')
    }

    setErrorMessages(error)
    return Object.keys(error).length === 0
  }, [errorMessages, username, validateEmail])

  const onSubmitForm = useCallback(async () => {
    setSubmitting(true)

    if (!isValid()) {
      setSubmitting(false)
      return
    }
    let avataURL = ''

    if (avatar) {
      const params = { filename: String(avatar.name) }
      const result: any = await axios
        .get(`${process.env.NEXT_PUBLIC_API}/upload/signed-url/${params.filename}`)
        .catch((error) => {
          console.warn(error)
        })
      const data = result?.data
      if (data) {
        avataURL = data.split(/[?]+/)[0]
        await axios
          .put(data, avatar, {
            headers: {
              'Content-Type': avatar.type,
            },
          })
          .catch((error) => {
            console.warn(error)
          })
      }
    }

    const dataSubmit: any = {}
    if (username && username !== userProfile?.username) dataSubmit.username = username
    if (!email) dataSubmit.email = null
    else if (email !== userProfile?.email) dataSubmit.email = email
    if (!telegram) dataSubmit.telegram = null
    else if (telegram !== userProfile?.telegram) dataSubmit.telegram = telegram
    if (avatar) dataSubmit.avatar = avataURL
    if (Object.keys(dataSubmit).length > 0) {
      // console.log(typeof JSON.stringify(dataSubmit), signer, 'signer')
      signer
        ?.signMessage(JSON.stringify(dataSubmit).toString())
        ?.then((res) => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API}/users/${account}`, {
              ...dataSubmit,
              signature: res,
            })
            .then((response) => {
              dispatch(updateUserProfileEdit({ userProfile: undefined }))
              axios
                .get(`${process.env.NEXT_PUBLIC_API}/users/${account}`)
                .then((response) => {
                  dispatch(updateUserProfile({ userProfile: response.data }))
                })
                .catch((error) => {
                  console.warn(error)
                })
              setAvata(undefined)
              // setProfileSuccess(true)
              setOpenFormReferral(false)
              toastSuccess(t('Success'), t('You have set your profile successfully.'))
            })
            .catch((error) => {
              console.warn(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    setSubmitting(false)
  }, [isValid, username, email, telegram, avatar])

  const renderAvataImage = useCallback(() => {
    if (avatar) {
      return (
        <img
          src={URL.createObjectURL(avatar as any)}
          width="100px"
          height="100px"
          alt=""
          style={{ borderRadius: '50%' }}
        />
      )
    }
    if (userProfile?.avatar) {
      return <img src={userProfile.avatar} width="100px" height="100px" alt="" style={{ borderRadius: '50%' }} />
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" fill="#4A4949" />
        <path
          d="M50 86C37.5 86 26.45 79.6 20 70C20.15 60 40 54.5 50 54.5C60 54.5 79.85 60 80 70C76.6944 74.922 72.2293 78.9558 66.9978 81.7459C61.7663 84.536 55.929 85.9969 50 86ZM50 15C53.9782 15 57.7936 16.5804 60.6066 19.3934C63.4197 22.2064 65 26.0218 65 30C65 33.9782 63.4197 37.7936 60.6066 40.6066C57.7936 43.4197 53.9782 45 50 45C46.0218 45 42.2064 43.4197 39.3934 40.6066C36.5803 37.7936 35 33.9782 35 30C35 26.0218 36.5803 22.2064 39.3934 19.3934C42.2064 16.5804 46.0218 15 50 15ZM50 0C43.4339 0 36.9321 1.29329 30.8658 3.80602C24.7995 6.31876 19.2876 10.0017 14.6447 14.6447C5.26784 24.0215 0 36.7392 0 50C0 63.2608 5.26784 75.9785 14.6447 85.3553C19.2876 89.9983 24.7995 93.6812 30.8658 96.194C36.9321 98.7067 43.4339 100 50 100C63.2608 100 75.9785 94.7322 85.3553 85.3553C94.7322 75.9785 100 63.2608 100 50C100 22.35 77.5 0 50 0Z"
          fill="#1D1C1C"
        />
      </svg>
    )
  }, [avatar, userProfile?.avatar])

  useEffect(() => {
    const saveable =
      avatar ||
      (username !== undefined && username !== userProfile?.username) ||
      !email ||
      (email && email !== userProfile?.email) ||
      !telegram ||
      (telegram && telegram !== userProfile?.telegram)
    setSaveable(saveable)
  }, [username, email, telegram, avatar, userProfile])

  useEffect(() => {
    if (!username) return
    const getData = setTimeout(() => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/users/${username?.trim()}/existed`)
        .then((response) => {
          const error = { ...errorMessages }
          if (username && username !== userProfile?.username && response.data) {
            error.username = t('This username already exists.')
          } else {
            delete error.username
          }
          setErrorMessages(error)
        })
        .catch((error) => console.log(error))
    }, 500)

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(getData)
  }, [username])

  const handleGetProfile = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/users/${account}`)
      .then((result) => {
        dispatch(updateUserProfile({ userProfile: result.data }))
        if (result.data) setEditForm(true)
        else if (router.asPath !== '/') {
          setEditForm(false)
          dispatch(updateOpenFormReferral({ openFormReferral: true }))
        }
      })
      .catch((error) => console.warn(error))
  }

  useEffect(() => {
    if (!account) {
      dispatch(updateUserProfile({ userProfile: undefined }))
      dispatch(updateUserProfileEdit({ userProfile: undefined }))
      dispatch(updateOpenFormReferral({ openFormReferral: false }))
      return
    }
    handleGetProfile()
  }, [account])

  useEffect(() => {
    setUsername(userProfile?.username || '')
    setEmail(userProfile?.email || '')
    setTelegram(userProfile?.telegram || '')
  }, [userProfile])

  useEffect(() => {
    setProfileSuccess(false)
    setAvata(undefined)
    setErrorMessages({})
  }, [openFormReferral])

  useEffect(() => {
    dispatch(updateOpenFormReferral({ openFormReferral: false }))
  }, [])

  return createPortal(
    openFormReferral ? (
      <ModalStyle>
        {profileSuccess ? (
          <SuccessModal>
            <Text
              fontSize="20px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="24px"
              color="rgba(255, 255, 255, 0.87)"
              textAlign="center"
              marginBottom="8px!important"
            >
              {t('Success')}
            </Text>
            <Text
              fontSize="16px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="24px"
              color="rgba(255, 255, 255, 0.6)"
              textAlign="center"
              margin="0 auto 24px!important"
              width="240px"
            >
              {t('You have set your profile successfully.')}
            </Text>
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/image45.png`} style={{ margin: 'auto', display: 'block', cursor: 'pointer' }} alt="" />
            <button onClick={onCloseBtnClicked} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
                  fill="#444444"
                  stroke="#444444"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.8285 9.17188L9.17163 14.8287"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.17163 9.17188L14.8285 14.8287"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </SuccessModal>
        ) : (
          <FormWrapper>
            <Text
              fontSize="20px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="24px"
              color="rgba(255, 255, 255, 0.87)"
              textAlign="center"
              marginBottom="8px!important"
            >
              {t('Profile')}
            </Text>
            <Text
              fontSize={['14px', , '16px']}
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="24px"
              color="rgba(255, 255, 255, 0.6)"
              textAlign="center"
              margin="0 auto 24px!important"
              width="240px"
            >
              {t('Set up your profile by filling in all the fields below.')}
            </Text>
            {/* {!userProfile && (
              <button
                onClick={() => {
                  // logout()
                  // eslint-disable-next-line no-unused-expressions
                  !editForm && handleRenderUserName(account)
                  onCloseBtnClicked()
                }}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
                    fill="#444444"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.8285 9.17188L9.17163 14.8287"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.17163 9.17188L14.8285 14.8287"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )} */}
            <div className="avatar">
              <label htmlFor="avatar" style={{ height: '100px' }}>
                {renderAvataImage()}
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12.5" cy="12.5" r="12.5" fill="url(#paint0_linear_11218_49247)" />
                  <path
                    d="M12.5 10.6248C11.4838 10.6248 10.625 11.4835 10.625 12.4998C10.625 13.516 11.4838 14.3748 12.5 14.3748C13.5163 14.3748 14.375 13.516 14.375 12.4998C14.375 11.4835 13.5163 10.6248 12.5 10.6248Z"
                    fill="white"
                  />
                  <path
                    d="M17.5 8.12476H15.8838L14.1919 6.43288C14.1339 6.37473 14.0651 6.32861 13.9892 6.29718C13.9134 6.26576 13.8321 6.24964 13.75 6.24976H11.25C11.1679 6.24964 11.0866 6.26576 11.0108 6.29718C10.9349 6.32861 10.8661 6.37473 10.8081 6.43288L9.11625 8.12476H7.5C6.81063 8.12476 6.25 8.68538 6.25 9.37476V16.2498C6.25 16.9391 6.81063 17.4998 7.5 17.4998H17.5C18.1894 17.4998 18.75 16.9391 18.75 16.2498V9.37476C18.75 8.68538 18.1894 8.12476 17.5 8.12476ZM12.5 15.6248C10.8063 15.6248 9.375 14.1935 9.375 12.4998C9.375 10.806 10.8063 9.37476 12.5 9.37476C14.1938 9.37476 15.625 10.806 15.625 12.4998C15.625 14.1935 14.1938 15.6248 12.5 15.6248Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_11218_49247"
                      x1="-1.9802"
                      y1="7.37683e-09"
                      x2="30.633"
                      y2="3.03468"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#B809B5" />
                      <stop offset="0.510417" stopColor="#ED1C51" />
                      <stop offset="1" stopColor="#FFB000" />
                    </linearGradient>
                  </defs>
                </svg>
              </label>
              <input
                type="file"
                id="avatar"
                defaultValue={avatar}
                onChange={onChangeAvata}
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
              />
              {errorMessages.avatar && (
                <span className="form__error-message-avata" style={{ marginTop: '24px' }}>
                  {errorMessages.avatar}
                </span>
              )}
            </div>
            <div>
              <FormLabel>
                {t('Username')}
                <span>*</span>
              </FormLabel>
              <FormInput
                value={username}
                onChange={handleUsername}
                maxLength={20}
                className={errorMessages.username ? 'error' : ''}
                placeholder={t('Enter username')}
              />
              {errorMessages.username && <span className="form__error-message">{errorMessages.username}</span>}
            </div>
            <div>
              <FormLabel>{t('Email (Optional)')}</FormLabel>
              <FormInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errorMessages.email ? 'error' : ''}
                placeholder={t('Enter email address')}
              />
              {errorMessages.email && <span className="form__error-message">{errorMessages.email}</span>}
            </div>
            <div>
              <FormLabel>{t('Tele ID (Optional)')}</FormLabel>
              <FormInput
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className={errorMessages.telegram ? 'error' : ''}
                placeholder={t('Enter telegram ID')}
              />
              {errorMessages.telegram && <span className="form__error-message">{errorMessages.telegram}</span>}
            </div>
            <div
              className="btns"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: 0 }}
            >
              <Button
                width="100%"
                mt="8px"
                onClick={() => {
                  // logout()
                  // eslint-disable-next-line no-unused-expressions
                  !editForm && handleRenderUserName(account)
                  onCloseBtnClicked()
                }}
                style={{ background: '#313131', height: '43px' }}
              >
                {t('Cancel')}
              </Button>
              <Button
                width="100%"
                mt="8px"
                onClick={onSubmitForm}
                style={{ height: '43px' }}
                disabled={!isSaveable || isSubmiting}
              >
                {t('Save')}
              </Button>
            </div>
          </FormWrapper>
        )}
      </ModalStyle>
    ) : null,
    modalElement,
  )
}

export default forwardRef(FormReferralModal)
