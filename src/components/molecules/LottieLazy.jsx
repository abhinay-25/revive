import React, { Suspense } from 'react'

const LazyLottie = React.lazy(() => import('lottie-react'))

export default function LottieLazy({
  animationData,
  className,
  loop = true,
  autoplay = true,
  style,
}) {
  return (
    <Suspense fallback={<div className={className} style={style} />}>
      <LazyLottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className={className}
        style={style}
      />
    </Suspense>
  )
}
