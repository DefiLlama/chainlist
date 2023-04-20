import * as Fathom from 'fathom-client'
import { useEffect, useState } from 'react'

import { FATHOM_ADS_ID } from '../../hooks/useAnalytics'
import { notTranslation as useTranslations } from '../../utils'

const BANNERS = [
  {
    name: 'LlamaNodes',
    image: './ads/llamanodes-banner.png',
    url: 'https://llamanodes.com',
  },
  {
    name: 'GMX',
    image: './ads/gmx-banner.png',
    url: 'https://app.gmx.io/#/trade/?ref=chainlist',
  }
]

export const AdBanner = ({ timer = 15000, showControls = false }) => {
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
      <a
        href={BANNERS[currentIndex].url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => Fathom.trackGoal(FATHOM_ADS_ID[BANNERS[currentIndex].name.toLowerCase()], 0)}
      >
        <img src={BANNERS[currentIndex].image} className="rounded-[10px] duration-500 w-full h-full" alt={`${BANNERS[currentIndex].name} banner`} />
      </a>

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
          href="mailto:contact@llama-corp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('your-ad-here')}, {t('contact-us').toLowerCase()}
        </a>
      </div>
    </div>
  )
}
