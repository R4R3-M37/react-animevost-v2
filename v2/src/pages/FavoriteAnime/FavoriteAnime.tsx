import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AnimeCart from '../AnimeList/components/AnimeCart'

import { IAnimeData, ISelectorState } from '../../types/types'
import { useGetAnimeMutation } from '../../redux/query/useGetAnimeData'
import ContainerList from '../AnimeList/components/ContainerList'


const FavoriteAnime = () => {
	const { favoriteID } = useSelector((state: ISelectorState) => state.favoriteID)
	const [doFetchAnimeData, { data: anime }] = useGetAnimeMutation()
	
	useEffect(() => {
		doFetchAnimeData(favoriteID.join(','))
	}, [])
	
	return (
		<ContainerList>
			{anime ? (
				anime.map((anime: IAnimeData) => <AnimeCart anime={anime} key={anime.id} />)
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
		</ContainerList>
	)
}

export default FavoriteAnime
