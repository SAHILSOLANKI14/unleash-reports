import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import BackspaceIcon from '@mui/icons-material/Backspace';

const Calc = ({ open, onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const evalResult = Function(`'use strict'; return (${input})`)();
      setResult(evalResult);
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          position: 'sticky',
          zIndex: 1,
          backgroundColor: 'white',
          borderBottom: '1px solid #ddd',
          padding: 3,
          mb: -6,
        }}
      >
        <Typography variant="h4" align="center">
          Calculator
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', padding: 4 }}>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={input}
            placeholder="Enter expression"
            InputProps={{ readOnly: true }}
            sx={{
              marginBottom: '-18px',
              borderBottom: 'none',
              borderRadius: '0px',
              fontSize: '1.6rem',
            }}
          />

          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={result}
            placeholder="Result"
            InputProps={{ readOnly: true }}
            sx={{
              marginBottom: '12px',
              borderBottom: 'none',
              borderRadius: '0px',
              fontSize: '1.6rem',
            }}
          />

          <Grid container spacing={1} justifyContent="center">
            {[
              { label: 'C', color: 'red', action: handleClear },
              { label: <BackspaceIcon />, color: 'orange', action: handleBackspace },
              { label: '%', color: 'default', action: () => handleButtonClick('%') },
              { label: '±', color: 'default', action: () => handleButtonClick('-') },
              { label: '7', color: 'default', action: () => handleButtonClick('7') },
              { label: '8', color: 'default', action: () => handleButtonClick('8') },
              { label: '9', color: 'default', action: () => handleButtonClick('9') },
              { label: '/', color: 'default', action: () => handleButtonClick('/') },
              { label: '4', color: 'default', action: () => handleButtonClick('4') },
              { label: '5', color: 'default', action: () => handleButtonClick('5') },
              { label: '6', color: 'default', action: () => handleButtonClick('6') },
              { label: 'x', color: 'default', action: () => handleButtonClick('*') },
              { label: '1', color: 'default', action: () => handleButtonClick('1') },
              { label: '2', color: 'default', action: () => handleButtonClick('2') },
              { label: '3', color: 'default', action: () => handleButtonClick('3') },
              { label: '-', color: 'default', action: () => handleButtonClick('-') },
              { label: '0', color: 'default', action: () => handleButtonClick('0') },
              { label: '.', color: 'default', action: () => handleButtonClick('.') },
              { label: '=', color: 'green', action: handleCalculate },
              { label: '+', color: 'default', action: () => handleButtonClick('+') },
            ].map(({ label, color, action }, index) => (
              <Grid item xs={3} key={index}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={action}
                  sx={{
                    backgroundColor:
                      color === 'red'
                        ? 'red'
                        : color === 'green'
                        ? 'green'
                        : color === 'orange'
                        ? 'orange'
                        : 'lightgray',
                    color: color === 'default' ? 'black' : 'white',
                    fontSize: '1.2rem',
                    minHeight: '52px',
                  }}
                >
                  {label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Calc;
