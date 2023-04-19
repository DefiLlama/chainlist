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

  return (
    <div className="w-full h-full m-auto relative group">
      <div
        style={{ backgroundImage: `url(${BANNERS[currentIndex].url})` }}
        className="w-full h-full rounded-[10px] bg-center bg-cover duration-500"
      />

      {/* left arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <div onClick={handlePrevBanner}>{'<'}</div>
      </div>

      {/* right arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <div onClick={handleNextBanner}>{'>'}</div>
      </div>
    </div>
  )
}
