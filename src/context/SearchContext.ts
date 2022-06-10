import { createContext } from 'react'

type ISearchContext = { searchValue: string; setSearchValue: any; enterKeyPressed: boolean; setEnterKeyPressed: any }

// @ts-ignore
export const SearchContext = createContext<ISearchContext>()
