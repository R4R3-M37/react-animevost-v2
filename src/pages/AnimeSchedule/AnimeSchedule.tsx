import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import { IAnimeResponseData, IAnimeScheduleData } from '../../types/types'
import Spoiler from '../../components/Spoiler'
import axios from 'axios'

const AnimeSchedule = () => {
	const apiUrlSchedule: string = '/v1/rasp'

	const [{ response: responseSchedule }, doFetchSchedule] = useFetch(apiUrlSchedule)

	const [responseAnime, setResponseAnime] = useState<any>(null)

	const id: number = responseSchedule && responseSchedule.map((anime: IAnimeScheduleData) => anime.id).join(',')

	const getAnimeInfoById = (id: number) => {
		return responseAnime && responseAnime.data.filter((anime: IAnimeResponseData) => anime.id === id)[0]
	}

	const getAnimeByDay = (day: number) => {
		return responseSchedule && responseSchedule.filter((anime: IAnimeScheduleData) => anime.day === day)
	}

	const days = [...Array(7).keys()]
	const dayChecker = (day: number) => {
		if (day === 0) {
			return 'Понедельник'
		} else if (day === 1) {
			return 'Вторник'
		} else if (day === 2) {
			return 'Среда'
		} else if (day === 3) {
			return 'Четверг'
		} else if (day === 4) {
			return 'Пятница'
		} else if (day === 5) {
			return 'Суббота'
		} else if (day === 6) {
			return 'Воскресенье'
		}
	}

	useEffect(() => {
		if (id !== null) {
			axios.post('https://api.animetop.info/v1/info', `id=${id}`).then((resp) => {
				setResponseAnime(resp.data)
			})
		}
	}, [id])

	useCallback(() => {
		doFetchSchedule({
			method: 'get',
		})
	}, [doFetchSchedule])

	return (
		<div className='container'>
			{days.map((day) => (
				<Spoiler title={dayChecker(day)} show={new Date().getDay() === day + 1} key={day}>
					<div className='row'>
						{responseSchedule &&
							responseAnime &&
							getAnimeByDay(day).map((anime: IAnimeResponseData) => (
								<div className='col col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6' key={anime.id}>
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
			))}
		</div>
	)
}

export default AnimeSchedule
