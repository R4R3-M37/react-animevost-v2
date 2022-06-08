import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { IAnimeResponseData } from '../../types/types'
import AnimeCart from '../AnimeList/components/AnimeCart'
import { Link } from 'react-router-dom'

const FavoriteAnime = () => {
	const apiUrl: string = '/v1/info'
	const [{ response }, doFetch] = useFetch(apiUrl)
	const [favoriteAnimeId] = useLocalStorage('favoriteAnimeId', '')

	useEffect(() => {
		if (favoriteAnimeId !== '') {
			doFetch({
				method: 'post',
				data: `id=${favoriteAnimeId.slice(0, -1)}`,
			})
		}
	}, [doFetch])

	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{response ? (
						response.data.map((anime: IAnimeResponseData) => <AnimeCart anime={anime} key={anime.id} />)
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
