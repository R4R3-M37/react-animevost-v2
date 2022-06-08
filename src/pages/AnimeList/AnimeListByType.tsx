import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AnimeCart from './components/AnimeCart'
import useFetch from '../../hooks/useFetch'

import { IAnimeResponseData } from '../../types/types'

const AnimeListByType: React.FC = () => {
	const { type } = useParams<{ type: string }>()

	const apiUrl: string = '/v1/search'
	const [{ response }, doFetch] = useFetch(apiUrl)

	const animeTypes = {
		тв: 31,
		'тв-спэшл': 32,
		ova: 33,
		ona: 34,
		'полнометражный фильм': 35,
		'короткометражный фильм': 36,
	}

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `cat=${animeTypes[type as keyof typeof animeTypes]}`,
		})
	}, [doFetch, type])

	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{response &&
						response.data.map((anime: IAnimeResponseData) => <AnimeCart anime={anime} key={anime.id} />)}
				</div>
			</div>
		</div>
	)
}

export default AnimeListByType
