import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

export const FATHOM_EVENTS_ID = {
  137: 'KZQZWMIP',
}

export const FATHOM_DROPDOWN_EVENTS_ID = {
  1: 'XIFGUQQY',
  137: 'C6AYES3T',
}

export const useAnalytics = () => {
	const router = useRouter()

	useEffect(() => {
		Fathom.load('TKCNGGEZ', {
			includedDomains: ['chainlist.defillama.com', 'chainlist.org'],
			url: 'https://surprising-powerful.llama.fi/script.js',
		})

		const onRouteChangeComplete = () => {
			Fathom.trackPageview()
		}

		router.events.on('routeChangeComplete', onRouteChangeComplete)

		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete)
		}
	}, [router.events])
}
