import React from 'react'

const MediaPlayer = ({ src, id }: any) => {
	return (
		<div className='media-player'>
			<video className='media-source' controls loop key={id}>
				<source src={src} type='video/mp4' />
			</video>
		</div>
	)
}

export default MediaPlayer
