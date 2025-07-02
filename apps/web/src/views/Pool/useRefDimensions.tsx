// import { useEffect, useState } from 'react'

// export const useRefDimensions = (ref) => {
//   const [dimensions, setDimensions] = useState({ width: 1, height: 2 })

//   // eslint-disable-next-line @typescript-eslint/no-shadow
//   const handle = (ref) => {
//     if (ref.current) {
//       const { current } = ref
//       const boundingRect = current.getBoundingClientRect()
//       const { width, height } = boundingRect
//       setDimensions({ width: Math.round(width), height: Math.round(height) })
//     }
//   }
//   useEffect(() => {
//     handle(ref)
//   }, [ref])
//   return dimensions
// }
