import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { IAnimeData, IAnimeScheduleData } from '../../types/types'
import Spoiler from '../../components/Spoiler'
import { useGetAnimeMutation, useGetAnimeScheduleQuery } from '../../redux/query/useGetAnimeData'


const AnimeSchedule = () => {
	const { data } = useGetAnimeScheduleQuery('rasp')
	const [doFetchAnimeData, { data: animeArray }] = useGetAnimeMutation()
	
	const id: string = data && data.map((anime: IAnimeScheduleData) => anime.id).join(',')
	
	const getAnimeInfoById = (id: number): IAnimeData => {
		return animeArray && animeArray.filter((anime: IAnimeData) => anime.id === id)[0]
	}
	
	const getAnimeByDay = (day: number): IAnimeData[] => {
		return data && data.filter((anime: IAnimeScheduleData) => anime.day === day)
	}
	
	const dayChecker = (day: number): string => {
		const daysArr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
		return daysArr[day]
	}
	
	useEffect(() => {
		if (!!id) {
			doFetchAnimeData(id)
		}
	}, [id])
	
	return (
		<div className='container'>
			{
				data && data.length > 0 ? [...Array(7).keys()].map((day) => (
					<Spoiler title={dayChecker(day)} show={new Date().getDay() === day + 1} key={day}>
						<div className='row'>
							{data &&
								animeArray &&
								getAnimeByDay(day).map((anime: IAnimeData) => (
									<div className='col col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6'
									     key={anime.id}>
										<Link to={`/anime/${anime.id}`} className='text-decoration-none'>
											<div className='d-flex justify-content-center preview-schedule-block'>
												<img
													alt='logo'
													className='preview-schedule'
													src={getAnimeInfoById(anime.id).urlImagePreview}
													loading='lazy'
												/>
											</div>
											<h6 className='my-3'>{getAnimeInfoById(anime.id).title.split('/')[0]}</h6>
										</Link>
									</div>
								))}
						</div>
					</Spoiler>
				)) : 'Недоступно сейчас'
			}
		</div>
	)
}

export default AnimeSchedule
