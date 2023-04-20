import { useEffect, useState } from 'react'

import { notTranslation as useTranslations } from '../../utils'

const BANNERS = [
  {
    image: './ads/llamanodes-banner.png'
  },
  {
    image: './ads/gmx-banner.png'
  }
]

export const AdBanner = ({ timer = 5000, showControls = false }) => {
  const t = useTranslations('Common')

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => handleNextBanner(), timer)

    return () => clearInterval(intervalId)
  }, [currentIndex])

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
    <div className="shadow w-full h-full m-auto relative group rounded-[10px]">
      <div
        style={{ backgroundImage: `url(${BANNERS[currentIndex].image})` }}
        className="w-full h-full rounded-[10px] bg-center bg-cover duration-500"
      />

      {/* left arrow */}
      {showControls && (
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-xl rounded-full px-2 bg-black/20 text-white cursor-pointer" onClick={handlePrevBanner}>
          &lsaquo;
        </div>
      )}

      {/* right arrow */}
      {showControls && (
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 text-xl rounded-full px-2 bg-black/20 text-white cursor-pointer" onClick={handleNextBanner}>
          &rsaquo;
        </div>
      )}

      <div className="w-full absolute bottom-0 text-center dark:bg-[#0D0D0D] bg-white rounded-b-[8px] text-xs text-gray-500 dark:text-[#B3B3B3] py-0.5">
        <a
          href="https://github.com/DefiLlama/chainlist"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('your-ad-here')}, {t('contact-us').toLowerCase()}
        </a>
      </div>
    </div>
  )
}
