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
      <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group">
        <div
          style={{ backgroundImage: `url(${BANNERS[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        />

        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <div onClick={handlePrevBanner}>{'<'}</div>
        </div>

        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <div onClick={handleNextBanner}>{'>'}</div>
        </div>

        <div className="flex top-4 justify-center py-2">
          {BANNERS.map((_, bannerIndex) => (
            <div
              key={bannerIndex}
              onClick={() => handleGoToBanner(bannerIndex)}
              className="text-2xl cursor-pointer"
            >
              .
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
