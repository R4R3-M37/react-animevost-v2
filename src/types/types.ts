export interface IAnimeResponseData {
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

export interface IAnimePageMediaResponse {
	std: any
	preview: string
	name: string
	hd?: any
}
