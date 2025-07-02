import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: only light!important;
  }
  * {
    font-family: 'Inter', sans-serif !important;
  }

  .grid_welcome_container {
    @media screen and (min-width: 901) {
      margin-left: 0px !important;
    }
  }


  body {
    background-color: #000;
    width: 100vw;
    overflow-x: hidden !important; 
    // overflow-y: visible !important;

    img {
      height: auto;
      max-width: 100%;
    }
  }



  div  {
    -webkit-tap-highlight-color: transparent;
  }



  #canvas3d_pc {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-18%, -65%);
    height: 758px !important;
    width: 1400px !important; 
  }

  #mobile_xox {
    position: absolute;
    right: -50%;
    transform: translateX(-40%); 

    @media screen and (max-width: 900px) {
      right: -50%;
      top: 60%;
      transform: translate(-45%, -34%); 
    }  
  }

  .welcome {
    @media screen and (max-width: 900px) {
      align-items: unset !important;
    }
  }

  #asset_3d {
    position: absolute;
    left: 50%;
    bottom: 35px;
    transform: translateX(-25%);
  }

  #asset_3d_mb {
    @media screen and (max-width: 900px) {
      position: absolute;
      left: 50%;
      transform: translateX(-39%);
    }
  }

  #mb_3d {
    position: absolute;
    top: 0;
    right: 50%;
    transform: translate(37%, -24%);
  }

  .product_active_hover {
    background: linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    text-fill-color: transparent !important;
  }

  .border-gradient-style{
    position: relative;
    &::before{
      content: "";
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      background-image: linear-gradient(358.38deg, rgba(184, 9, 181, 0) 10.87%, rgba(237, 28, 81, 0.5) 45.58%, rgba(255, 176, 0, 0.5) 78.88%);
      z-index: 1;
      border-radius: 10px;
    }
    >div{
      background: #242424;
      z-index: 9;
      border-radius: 10px;
      position: relative;
    }
  }


  .border-gradient-style_expand {
    position: relative;
    &::before{
      content: "";
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: -200px;
      left: -2px;
      background-image: linear-gradient(179.95deg, #6034FF 0.08%, rgba(163, 90, 255, 0) 99.95%);
      z-index: 1;
      border-radius: 10px;
    }
    >div{
      background: #242424;
      z-index: 9;
      border-radius: 10px;
      position: relative;
    }
  }

  .border-gradient-restyle-bottom {
    position: relative;
    &::before{
      content: "";
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: 60px;
      left: -2px;
      background-image: linear-gradient(179.95deg, #6034FF 0.08%, rgba(163, 90, 255, 0) 99.95%);
      z-index: 1;
      border-radius: 10px;
    }
    >div{
      background: #242424;
      z-index: 9;
      border-radius: 10px;
      position: relative;
    }
  }


 #u_question_farming {
  div {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    max-width: max-content;
    color: rgba(255, 255, 255, 0.87);
  }
 }

 .container_bridge  {
  transform: translateY(-50%);
  position: absolute;
  top: 50%; 
  @media screen and (max-width: 851px) {
    transform: unset;
    position: relative;
    top: unset; 
    margin-top: 40px;
  }
 }


 .text_potential:hover {
  text-decoration:underline;
 }

 .open-icon {
  margin-bottom: -3px !important; 
 }
`

export default GlobalStyle
