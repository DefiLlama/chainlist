import { useState } from 'react'

const BANNERS = [
  {
    url: './ads/llamanodes-banner.png'
  },
  {
    url: './ads/gmx-banner.png'
  }
]

export const AdBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevBanner = () => {
    const isFirstBanner = currentIndex === 0
    const newIndex = isFirstBanner ? BANNERS.length - 1 : currentIndex - 1

    setCurrentIndex(newIndex)
  }

  const handleNextBanner = () => {
    const isLastBanner = currentIndex === BANNERS.length - 1
    const newIndex = isLastBanner ? 0 : currentIndex + 1

    setCurrentIndex(newIndex)
  }

  const handleGoToBanner = (bannerIndex) => setCurrentIndex(bannerIndex)

  return (
    <div className="shadow dark:bg-[#0D0D0D] bg-white p-8 pb-0 rounded-[10px] flex flex-col gap-3 overflow-hidden">
    </div>
  )
}
