import React from 'react'

interface IContainerListProps {
	children: React.ReactNode
}

const ContainerList: React.FC<IContainerListProps> = ({children}) => {
	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{children}
				</div>
			</div>
		</div>
	)
}

export default ContainerList