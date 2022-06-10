import { useEffect, useState } from 'react'
import axios from 'axios'

import { IAnimeResponseData } from '../types/types'

import { baseUrl } from '../config'

const useScrollPagination: (
	page: number,
	setPage: (page: (page: number) => number) => void,
	apiUrl: string
) => IAnimeResponseData[] = (page, setPage, apiUrl) => {
	const [response, setResponse] = useState<IAnimeResponseData[]>([])
	const [fetching, setFetching] = useState<boolean>(true)

	const scrollHandler = (): void => {
		if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 1) {
			setFetching(true)
		}
	}

	useEffect(() => {
		if (fetching) {
			axios
				.get(baseUrl + apiUrl)
				.then((res) => {
					setResponse([...response, ...res.data.data])
					setPage((page: number) => page + 1)
				})
				.finally(() => setFetching(false))
		}
	}, [fetching, apiUrl])

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	return response
}

export default useScrollPagination
