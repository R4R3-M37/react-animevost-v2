import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from './components/Navbar/Navbar'
import AppRoutes from './components/AppRoutes'
import { ISelectorState } from './types/types'


const App: React.FC = () => {
	const navigate = useNavigate()
	const { search } = useSelector((state: ISelectorState) => state)
	
	useEffect(() => {
		if (search.searchInput) {
			navigate('/')
		}
	}, [])
	
	return (
		<>
			<Navbar />
			<AppRoutes />
		</>
	)
}

export default App
