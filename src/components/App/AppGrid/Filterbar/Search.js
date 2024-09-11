import React from 'react';
import styled from 'styled-components';
import Form from '../../shared/Form';
import Box from '@mui/material/Box';
import { ReactComponent as SearchIcon } from 'src/assets/lms/icons/search.svg';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Search({ value, onChange }) {
  const onClose = () => {
    onChange('');
  };
  return (
    <Wrapper>
      <Form
        initialValues={{
          search: value,
        }}
        enableReinitialize={true}
      >
        {({ values }) => {
          return (
            <Form.Field.InputDebounced
              name="search"
              placeholder="Search Keyword"
              variant="outlined"
              size="small"
              fullWidth
              onChange={(val) => {
                onChange(val);
              }}
              InputProps={{
                startAdornment: (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{ width: '40px' }}
                  >
                    <React.Fragment>
                      <SearchIcon sx={{ width: '24px', height: '24px' }} />
                    </React.Fragment>
                  </Box>
                ),
                endAdornment: (
                  <React.Fragment>
                    {value && value !== '' ? (
                      <IconButton onClick={onClose}>
                        <CloseIcon style={{ color: 'white' }} />
                      </IconButton>
                    ) : null}
                  </React.Fragment>
                ),
              }}
            />
          );
        }}
      </Form>
    </Wrapper>
  );
}

export default Search;

const Wrapper = styled.div`
  & .MuiFormControl-root {
    margin: 0;
  }
`;
