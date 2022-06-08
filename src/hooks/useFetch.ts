import { SetStateAction, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const useFetch: (url: string) => any = (url) => {
	const baseUrl: string = 'https://api.animetop.info'
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [response, setResponse] = useState<any>(null)
	const [error, setError] = useState<any>(null)
	const [options, setOptions] = useState<object | null>({})

	const doFetch = useCallback((options: SetStateAction<object | null>) => {
		setIsLoading(true)
		setOptions(options)
	}, [])

	useEffect(() => {
		let skipGetResponseAfterDie = false
		const requestOptions = {
			...options,
		}
		if (!isLoading) {
			return
		}
		axios(baseUrl + url, requestOptions)
			.then((res) => {
				if (!skipGetResponseAfterDie) {
					setIsLoading(false)
					setResponse(res.data)
				}
			})
			.catch((error) => {
				if (!skipGetResponseAfterDie) {
					setIsLoading(false)
					setError(error.response.data)
				}
			})

		return () => {
			skipGetResponseAfterDie = true
		}
	}, [isLoading, options, url])

	return [{ isLoading, response, error }, doFetch]
}

export default useFetch
