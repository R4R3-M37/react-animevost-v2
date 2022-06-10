import React from 'react'

interface MediaPlayerProps {
	src: string
	id: string
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ src, id }) => {
	return (
		<div className='media-player'>
			<video className='media-source' controls loop key={id}>
				<source src={src} type='video/mp4' />
			</video>
		</div>
	)
}

export default MediaPlayer
