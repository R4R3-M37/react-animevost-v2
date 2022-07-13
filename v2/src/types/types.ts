export interface IAnimeData {
	id: number
	title: string
	description: string
	type: string
	urlImagePreview: string
	screenImage: string[]
	director: string
	genre: string
	rating: number
	votes: number
	year: number
}

export interface IAnimeScheduleData {
	day: number
	id: number
	name: string
	time: string
}

export interface IAnimeMediaResponse {
	std: any
	preview: string
	name: string
	hd?: any
}

interface IFavoriteID {
	favoriteID: string[]
}

interface ISearch {
	activeSearch: boolean
	searchInput: string
	type: string
	genre: string
	year: string | number
}

export interface ISelectorState {
	favoriteID: IFavoriteID
	search: ISearch
}