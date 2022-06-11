import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import AnimeCart from '../AnimeList/components/AnimeCart'
import { animeTypes, baseUrl } from '../../config'
import { SearchContext } from '../../context/SearchContext'

import { IAnimeResponseData } from '../../types/types'

interface IError {
	error: string
}

const AnimeSearch = () => {
	const [response, setResponse] = useState<IAnimeResponseData[] | null>(null)
	const [error, setError] = useState<IError | null>(null)
	const { activeAnimeType, activeAnimeGenre, activeAnimeYear, searchActive } = useContext(SearchContext)

	useEffect(() => {
		axios
			.post(
				`${baseUrl}search`,
				`cat=${
					animeTypes[activeAnimeType.toLowerCase() as keyof typeof animeTypes]
				}&year=${activeAnimeYear}&gen=${activeAnimeGenre}`
			)
			.then((resp) => {
				setResponse(resp.data.data)
			})
			.catch((error) => {
				setError(error.response.data)
			})
	}, [searchActive])

	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{error && !response && error.error}
					{response && response.map((anime) => <AnimeCart anime={anime} key={anime.id} />)}
				</div>
			</div>
		</div>
	)
}

export default AnimeSearch
