import React from 'react'

interface ISpoilerProps {
	children: React.ReactNode
	title: string
	className?: string
	show?: boolean
}

const Spoiler: React.FC<ISpoilerProps> = ({ children, title, className, show }) => {
	const option: string = title.replace(/\s+/g, '')

	return (
		<div
			className={className ? `mt-3 accordion accordion-flush ${className}` : 'mt-3 accordion accordion-flush'}
			id='accordionExample'
		>
			<div className='accordion-item'>
				<h2 className='accordion-header'>
					<button
						className={show ? 'accordion-button' : 'accordion-button collapsed'}
						type='button'
						data-bs-toggle='collapse'
						data-bs-target={`#collapse${option}`}
						aria-expanded='false'
					>
						{title}
					</button>
				</h2>
				<div
					id={`collapse${option}`}
					className={show ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}
					data-bs-parent={`#accordion${option}`}
				>
					<div className='accordion-body'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Spoiler
