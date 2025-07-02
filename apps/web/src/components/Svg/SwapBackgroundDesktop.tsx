const SwapbackgroundDesktop = () => {
  return (
    <svg width={560} height={311} viewBox="0 0 560 311" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_5810_3640)">
        <path
          d="M550.573 26.5261L518.289 3.67548C514.911 1.28418 510.874 0 506.735 0H52.2624C48.1233 0 44.0862 1.28418 40.7077 3.67548L8.46659 26.496C3.15795 30.2535 0.00793384 36.3577 0.0212709 42.8616L0.503479 278.011V290.5C0.503479 301.546 9.45778 310.5 20.5035 310.5H46.404H513.599H539.5C550.546 310.5 559.5 301.546 559.5 290.5V278.011L559.018 42.8096C559.005 36.3347 555.858 30.2668 550.573 26.5261Z"
          fill="#0a0a0a"
          // fillOpacity="0.5"
        />
        <path
          d="M1.00348 278.01V278.011V290.5C1.00348 301.27 9.73392 310 20.5035 310H46.404H513.599H539.5C550.27 310 559 301.27 559 290.5V278.012V278.011L558.518 42.8107C558.505 36.4976 555.437 30.5815 550.284 26.9342L518 4.08359C514.706 1.75208 510.77 0.5 506.735 0.5H52.2624C48.2268 0.5 44.2906 1.75208 40.9966 4.08359L8.75545 26.9041C3.57953 30.5677 0.508266 36.5193 0.52127 42.8605L1.00348 278.01Z"
          stroke="url(#paint0_linear_5810_3640)"
          strokeOpacity="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_5810_3640"
          x="-19.979"
          y={-20}
          width="599.479"
          height="350.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation={10} />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5810_3640" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5810_3640" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_5810_3640"
          x1="559.5"
          y1="195.564"
          x2="562.45"
          y2="2.63107"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0153197" stopColor="#B809B5" stopOpacity={0} />
          <stop offset="0.510417" stopColor="#ED1C51" />
          <stop offset={1} stopColor="#FFB000" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SwapbackgroundDesktop
