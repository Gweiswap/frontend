import { StyleFixHeight, StyledAggregator, BtnLearMore, Overlay } from '.'

const Aggregators = () => {
  return (
    <>
      <StyleFixHeight>
        <StyledAggregator name="aggregators">
          {aggregators.map((item) => (
            <Overlay>
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Aggregatorsnew/${item}.svg`}
                key={item}
                alt="dex"
                loading="lazy"
                width="38px"
                height="38px"
              />
            </Overlay>
          ))}
        </StyledAggregator>
      </StyleFixHeight>

      <div className="btn_learn_more_ecosystem">
        <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/supported-chains-dexs-and-aggregators" />
      </div>
    </>
  )
}

const aggregators = [
  '1. 1inch',
  '2. KyberSwap',
  '3. paraswap',
  '4. Matcha',
  '5. DODO',
  '6. openocean',
  '7. orion',
  '8. 1 sol',
  '9. rango',
  '10. atlasdex',
  '11. tokenlon',
  '12. xy_finance',
  '13. totle',
  '14. cow swap',
  '15. jupiter aggregator',
  '16. zeroswap',
  '17. li.fi',
  '18. Honeyswap',
  '19. o3lab',
  '20. Matrixswap',
  '21. droidex',
  '22. autofarm',
  '23. SwapMatic',
  '24. rubic',
  '25. firebird',
  '26. Swapzone',
  '27. Shell Protocol',
  '28. Sushi',
  '29. Convergence',
  '31. 0x',
]

export default Aggregators
