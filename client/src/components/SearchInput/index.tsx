import { useState, ChangeEvent, KeyboardEvent } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Search, SearchIconWrapper, StyledInputBase } from './styled'
import { useAppDispatch, useAppSelector } from '@hooks/redux.hooks'
import { setSearchWord } from '@store/reducers/searchSlice'

export const SearchInput = () => {
  const { search: storedSearch } = useAppSelector((state) => state.searchReducer)
  const [search, setSearch] = useState(storedSearch)
  const dispatch = useAppDispatch()

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      dispatch(setSearchWord(search))
    }
  }
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        type='search'
        value={search}
        onChange={handleSearch}
        onKeyPress={handleSearchKey}
        placeholder='Search meetup…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}
