const SwapNonTrade = () => {
  return (
    <svg width="591" height="622" viewBox="0 0 591 622" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_5810_3573)">
        <path
          d="M570.777 45.4999L531.696 17.8377C530.006 16.6421 527.988 16 525.918 16H65.0847C63.0152 16 60.9966 16.6421 59.3074 17.8377L20.2259 45.4999C17.5775 47.3745 16.0033 50.4175 16.0033 53.6622L16 573.511V596C16 601.523 20.4772 606 26 606H61.9005H529.096H564.997C570.519 606 574.997 601.523 574.997 596V573.511L575 53.6622C575 50.4175 573.426 47.3745 570.777 45.4999Z"
          fill="#242424"
        />
        <path
          d="M569.911 46.7242L530.829 19.0621C529.393 18.0458 527.677 17.5 525.918 17.5H65.0847C63.3256 17.5 61.6098 18.0458 60.174 19.0621L21.0925 46.7243C18.8414 48.3177 17.5033 50.9042 17.5033 53.6622L17.5 573.511V596C17.5 600.694 21.3056 604.5 26 604.5H61.9005H529.096H564.997C569.691 604.5 573.497 600.694 573.497 596V573.511L573.5 53.6622C573.5 50.9042 572.162 48.3176 569.911 46.7242Z"
          stroke="url(#paint0_linear_5810_3573)"
          strokeWidth={3}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_5810_3573"
          x="0"
          y="0"
          width="591"
          height="622"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5810_3573" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5810_3573" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_5810_3573"
          x1="254.5"
          y1="16"
          x2="253.029"
          y2="532"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6437FF" />
          <stop offset="0.442708" stopColor="#9F59FF" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SwapNonTrade
