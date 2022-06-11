import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import AnimeCart from '../AnimeList/components/AnimeCart'
import { baseUrl } from '../../config'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import { IAnimeResponseData } from '../../types/types'

const FavoriteAnime = () => {
	const [favoriteAnimeId] = useLocalStorage('favoriteAnimeId', '')
	const [response, setResponse] = useState<IAnimeResponseData[] | null>(null)

	useEffect(() => {
		axios.post(`${baseUrl}info`, `id=${favoriteAnimeId.slice(0, -1)}`).then((resp) => {
			setResponse(resp.data.data)
		})
	}, [])

	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{response ? (
						response.map((anime: IAnimeResponseData) => <AnimeCart anime={anime} key={anime.id} />)
					) : (
						<h2 className='text-center'>
							Тут пусто!
							<br />
							<br />
							<Link to={'/'} className='btn btn-outline-secondary'>
								Добавить аниме
							</Link>
						</h2>
					)}
				</div>
			</div>
		</div>
	)
}

export default FavoriteAnime
