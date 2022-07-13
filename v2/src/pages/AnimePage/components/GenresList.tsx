import React from 'react'
import { Link } from 'react-router-dom'


const GenresList= ({ anime }: any) => {
	const genre = anime && anime.genre.split(',')
	
	return (
		<>
			{genre.map((genre: string, index: number) => (
				<span className='me-2 mb-1 mt-1 badge bg-secondary' key={index}>
				<Link to={`/anime/genre/${genre.trim()}`} className='text-decoration-none link-light'>
					{genre}
				</Link>
			</span>
			))}
		</>
	)
}

export default GenresList