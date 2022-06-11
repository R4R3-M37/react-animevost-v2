import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import AnimeCart from './components/AnimeCart'
import { animeTypes, baseUrl } from '../../config'

import { IAnimeResponseData } from '../../types/types'

const AnimeListByType: React.FC = () => {
	const { type } = useParams<{ type: string }>()
	const [response, setResponse] = useState<IAnimeResponseData[] | null>(null)

	useEffect(() => {
		axios.post(`${baseUrl}search`, `cat=${animeTypes[type as keyof typeof animeTypes]}`).then((resp) => {
			setResponse(resp.data.data)
		})
	}, [])

	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{response && response.map((anime) => <AnimeCart anime={anime} key={anime.id} />)}
				</div>
			</div>
		</div>
	)
}

export default AnimeListByType
