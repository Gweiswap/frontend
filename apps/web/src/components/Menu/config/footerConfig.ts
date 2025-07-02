import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: 'Products',
    items: [
      {
        label: t('Swap'),
        href: '/swap',
        product: true,
        inactive: false,
      },
      {
        label: t('Bridge'),
        href: 'bridge-token',
        product: true,
        inactive: false,
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
        product: true,
        inactive: false,
      },
      {
        label: t('Farming'),
        href: '/pools',
        product: true,
        inactive: false,
      },
      {
        label: t('Referral'),
        href: '/referral',
        product: true,
        inactive: false,
      },
      {
        label: t('Assets'),
        href: '/info',
        product: true,
        inactive: false,
      },
      {
        label: t('Stable Coin'),
        href: '/stable-coin',
        product: true,
        inactive: false,
      },
    ],
  },
  {
    label: 'Explore',
    items: [
      {
        label: 'Company',
        href: '/company',
      },
      {
        label: 'Audits',
        href: 'https://docs.xoxlabs.io/security/xox-token-certik-audit',
      },
      {
        label: 'Partners',
        href: 'https://docs.xoxlabs.io/strategic-partners-and-backers/ecosystem-partners',
      },
      {
        label: 'Smart Contracts',
        href: 'https://docs.xoxlabs.io/powering-the-ecosystem/xox-native-utility-token',
      },
      {
        label: 'CoinMarketCap',
        href: null,
      },
      {
        label: 'XOX Dex V2',
        href: '/dex-v2',
      },
    ],
  },
  {
    label: 'Support',
    items: [
      {
        label: t('Docs'),
        href: 'https://docs.xoxlabs.io',
      },
      {
        label: t('Terms of Service'),
        href: 'https://docs.xoxlabs.io/company/xox-labs-terms-of-service',
      },
      {
        label: t('Privacy Policies'),
        href: 'https://docs.xoxlabs.io/company/xox-labs-privacy-policy',
      },
    ],
  },
  {
    label: 'Reach us',
    items: [
      {
        label: t('Partnerships Inquiries'),
        label2: t('partnership@xoxlabs.io'),
        href2: 'mailto://partnership@xoxlabs.io',
        icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9395 3.5C18.2805 3.5 19.5705 4.03 20.5195 4.981C21.4695 5.93 22.0005 7.21 22.0005 8.55V16.45C22.0005 19.24 19.7305 21.5 16.9395 21.5H7.06049C4.26949 21.5 2.00049 19.24 2.00049 16.45V8.55C2.00049 5.76 4.25949 3.5 7.06049 3.5H16.9395ZM18.5305 10.04L18.6105 9.96C18.8495 9.67 18.8495 9.25 18.5995 8.96C18.4605 8.811 18.2695 8.72 18.0705 8.7C17.8605 8.689 17.6605 8.76 17.5095 8.9L13.0005 12.5C12.4205 12.981 11.5895 12.981 11.0005 12.5L6.50049 8.9C6.18949 8.67 5.75949 8.7 5.50049 8.97C5.23049 9.24 5.20049 9.67 5.42949 9.97L5.56049 10.1L10.1105 13.65C10.6705 14.09 11.3495 14.33 12.0605 14.33C12.7695 14.33 13.4605 14.09 14.0195 13.65L18.5305 10.04Z" fill="white"/>
        </svg>
        `,
      },
      {
        label: t('Support Team'),
        label2: t('support@xoxlabs.io'),
        href2: 'mailto://support@xoxlabs.io',
        icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9395 3.5C18.2805 3.5 19.5705 4.03 20.5195 4.981C21.4695 5.93 22.0005 7.21 22.0005 8.55V16.45C22.0005 19.24 19.7305 21.5 16.9395 21.5H7.06049C4.26949 21.5 2.00049 19.24 2.00049 16.45V8.55C2.00049 5.76 4.25949 3.5 7.06049 3.5H16.9395ZM18.5305 10.04L18.6105 9.96C18.8495 9.67 18.8495 9.25 18.5995 8.96C18.4605 8.811 18.2695 8.72 18.0705 8.7C17.8605 8.689 17.6605 8.76 17.5095 8.9L13.0005 12.5C12.4205 12.981 11.5895 12.981 11.0005 12.5L6.50049 8.9C6.18949 8.67 5.75949 8.7 5.50049 8.97C5.23049 9.24 5.20049 9.67 5.42949 9.97L5.56049 10.1L10.1105 13.65C10.6705 14.09 11.3495 14.33 12.0605 14.33C12.7695 14.33 13.4605 14.09 14.0195 13.65L18.5305 10.04Z" fill="white"/>
        </svg>
        `,
      },
      // {
      //   label: t('partnership@xoxlabs.io'),
      //   href: 'email://partnership@xoxlabs.io',
      //   icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      //   <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9395 3.5C18.2805 3.5 19.5705 4.03 20.5195 4.981C21.4695 5.93 22.0005 7.21 22.0005 8.55V16.45C22.0005 19.24 19.7305 21.5 16.9395 21.5H7.06049C4.26949 21.5 2.00049 19.24 2.00049 16.45V8.55C2.00049 5.76 4.25949 3.5 7.06049 3.5H16.9395ZM18.5305 10.04L18.6105 9.96C18.8495 9.67 18.8495 9.25 18.5995 8.96C18.4605 8.811 18.2695 8.72 18.0705 8.7C17.8605 8.689 17.6605 8.76 17.5095 8.9L13.0005 12.5C12.4205 12.981 11.5895 12.981 11.0005 12.5L6.50049 8.9C6.18949 8.67 5.75949 8.7 5.50049 8.97C5.23049 9.24 5.20049 9.67 5.42949 9.97L5.56049 10.1L10.1105 13.65C10.6705 14.09 11.3495 14.33 12.0605 14.33C12.7695 14.33 13.4605 14.09 14.0195 13.65L18.5305 10.04Z" fill="white"/>
      //   </svg>
      //   `,
      // },
      // {
      //   label: '+91 98765 43210',
      //   href: 'tel://+91 98765 43210',
      //   icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      //   <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00846 11.1948C5.00846 10.5762 5.01591 9.95751 5.02339 9.336L5.02339 9.33599C5.02719 9.02089 5.03099 8.70506 5.03384 8.38813C5.03384 4.98283 7.16556 2.5 10.1094 2.5H13.8906C16.8344 2.5 18.9662 4.98283 18.9662 8.38813C18.9915 9.75221 19 11.1163 19 12.4902C19 13.8641 18.9915 15.2478 18.9662 16.6119C18.9662 20.0172 16.8344 22.5 13.8906 22.5H10.1094C7.16556 22.5 5.03384 20.0172 5.03384 16.6021C5.01692 15.3165 5 14.0015 5 12.6668L5.00846 11.1948ZM13.28 20.1402V20.3002C13.28 20.9738 12.7168 21.5002 12 21.5002C11.3003 21.5002 10.72 20.9738 10.72 20.3002V20.1402C10.72 19.4842 11.3003 18.9402 12 18.9402C12.7168 18.9402 13.28 19.4842 13.28 20.1402ZM7.01671 8.94364C7.01136 9.34763 7.00604 9.74974 7.00604 10.1519L7 11.1087C7 11.9762 7.01208 12.831 7.02417 13.6666C7.02417 15.8864 8.54683 17.5002 10.6495 17.5002H13.3505C15.4532 17.5002 16.9758 15.8864 16.9758 13.673C16.994 12.7863 17 11.8869 17 10.9939C17 10.1008 16.994 9.21418 16.9758 8.32753C16.9758 6.11408 15.4532 4.50024 13.3505 4.50024H10.6495C8.54683 4.50024 7.02417 6.11408 7.02417 8.32753C7.02214 8.53354 7.01942 8.73883 7.01671 8.94364Z" fill="white"/>
      //   </svg>
      //   `,
      // },
      // {
      //   label: '772 Lyonwood Ave',
      //   label2: 'Walnut, CA 91789',
      //   href: '/community-guildlines',
      //   icon: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      //   <path fill-rule="evenodd" clip-rule="evenodd" d="M12.03 2.50002C14.29 2.51002 16.45 3.41002 18.03 4.99002C19.62 6.58002 20.51 8.73002 20.5 10.96V11.01C20.44 14.04 18.74 16.83 16.62 19.01C15.42 20.24 14.09 21.33 12.64 22.25C12.25 22.58 11.68 22.58 11.29 22.25C9.14 20.85 7.24 19.09 5.7 17.04C4.35 15.26 3.58 13.12 3.5 10.89C3.52 6.24002 7.34 2.49002 12.03 2.50002ZM12.03 13.76C12.74 13.76 13.42 13.49 13.92 13C14.44 12.49 14.731 11.811 14.731 11.1C14.731 9.62002 13.52 8.43002 12.03 8.43002C10.54 8.43002 9.34 9.62002 9.34 11.1C9.34 12.561 10.52 13.74 12 13.76H12.03Z" fill="white"/>
      //   </svg>
      //   `,
      // },
    ],
  },
]
