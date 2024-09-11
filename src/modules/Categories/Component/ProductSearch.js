import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 300), // Adjust delay as needed
    [onSearch],
  );
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm); // Use debounced function
  };

  return (
    <>
      {' '}
      <Stack
        spacing={1}
        direction="row"
        sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'end' }}
      >
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          search:
        </Typography>
        <TextField
          label="Add an existing Name"
          id="fullWidth"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          margin="normal"
          autoFocus={true}
          inputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{ style: { fontSize: 15 } }}
        />
      </Stack>
    </>
  );
};

export default ProductSearch;
