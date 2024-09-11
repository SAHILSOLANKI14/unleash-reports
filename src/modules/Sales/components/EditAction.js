import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const ariaLabel = { 'aria-label': 'description' };

export default function Inputs() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Input placeholder="customer" inputProps={ariaLabel} />
      <Input placeholder="biller" inputProps={ariaLabel} />
      <Button> Submit </Button>
    </Box>
  );
}
