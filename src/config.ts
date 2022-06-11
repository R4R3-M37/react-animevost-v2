import range from 'lodash/range'

export const baseUrl: string = 'https://api.animetop.info/v1/'

export const allAnimeTypes: string[] = ['OVA', 'ONA', 'ТВ', 'ТВ-спэшл', 'К. фильм', 'П. фильм']

export const allAnimeGenres: string[] = [
	'Приключения',
	'Фэнтези',
	'Фантастика',
	'Мистика',
	'Комедия',
	'Боевые искусства',
	'Война',
	'Драма',
	'Детектив',
	'История',
	'Меха',
	'Махо-сёдзё',
	'Музыкальный',
	'Повседневность',
	'Пародия',
	'Романтика',
	'Сёнэн',
	'Сёдзё',
	'Спорт',
	'Сказка',
	'Сёдзё-ай',
	'Сёнэн-ай',
	'Самураи',
	'Триллер',
	'Ужасы',
	'Школа',
	'Этти',
]

export const allAnimeYears: number[] = range(new Date().getFullYear(), 1970)

export const animeTypes = {
	тв: 31,
	'тв-спэшл': 32,
	ova: 33,
	ona: 34,
	'полнометражный фильм': 35,
	'п. фильм': 35,
	'короткометражный фильм': 36,
	'к. фильм': 36,
	'': '',
}
