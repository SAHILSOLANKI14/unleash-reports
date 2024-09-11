import React, { useState, useCallback, useRef, useEffect } from 'react';
import { InputAdornment, ButtonBase, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'lodash';
import { useTheme } from '@mui/material';

function SearchInput({ searchText, placeholder, ...props }) {
  const { palette } = useTheme();
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    debounce((newValue) => props.onSearch(newValue), 500),
    [],
  );

  useEffect(() => {
    if (searchText && searchText !== '' && searchText !== value) {
      setValue(searchText);
    }
  }, [searchText]);

  const valueRef = useRef(value);
  valueRef.current = value;

  const clearSearch = () => {
    setValue('');
    props.onSearch('');
  };

  return (
    <OutlinedInput
      value={value}
      size="small"
      placeholder={placeholder}
      onChange={(event) => {
        event.persist();
        setValue(event.target.value);
        handleChange(event.target.value);
      }}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      endAdornment={
        value && value !== '' ? (
          <InputAdornment position="end">
            <ButtonBase onClick={clearSearch}>
              <CloseIcon />
            </ButtonBase>
          </InputAdornment>
        ) : (
          <></>
        )
      }
      sx={{
        ...(palette.type === 'dark'
          ? {
              backgroundColor: palette.background.default,
              border: 'none',
              '& fieldset': {
                border: 'none',
              },
            }
          : {}),
      }}
    />
  );
}

export { SearchInput };

export default SearchInput;

export function debounceSearchRender(debounceWait = 300) {
  return (searchText, handleSearch, hideSearch, options) => {
    return (
      <SearchInput
        searchText={searchText}
        onSearch={handleSearch}
        onHide={hideSearch}
        options={options}
        debounceWait={debounceWait}
      />
    );
  };
}
