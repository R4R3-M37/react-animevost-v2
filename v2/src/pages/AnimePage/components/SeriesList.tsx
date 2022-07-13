import React from 'react'

import { IAnimeMediaResponse } from '../../../types/types'


const SeriesList = ({series, videoActive, setVideoActive, highDefinition}: any) => {
	return (
		<>
			{series ? (
				series.map((anime: IAnimeMediaResponse, index: number) => (
					<button
						onClick={() => setVideoActive(highDefinition ? anime.hd : anime.std)}
						className={
							highDefinition
								? anime.hd === videoActive
									? 'me-2 mb-1 mt-1 btn btn-secondary'
									: 'me-2 mb-1 mt-1 btn btn-outline-secondary'
								: anime.std === videoActive
									? 'me-2 mb-1 mt-1 btn btn-secondary'
									: 'me-2 mb-1 mt-1 btn btn-outline-secondary'
						}
						key={index}
					>
						{anime.name}
					</button>
				))
			) : (
				<code>Нет серий, Анонс?!</code>
			)}
		</>
	)
}

export default SeriesList