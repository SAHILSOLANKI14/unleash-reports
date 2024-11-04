import SyncIcon from '@mui/icons-material/Sync';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const Tab3 = ({
  generateEachCode,
  generateCaseCode,
  generateinnerCode,
  handlePrev,
  handleNext,
  EachCode,
  caseCode,
  innerPackCode,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ mb: 1 }}>Default Sale Unit *</InputLabel>
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
          <Select defaultValue="Each (1)">
            <MenuItem value="Each (1)">Each (1)</MenuItem>
            <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
            <MenuItem value="Case (3)">Case (3)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel sx={{ mb: 1 }}>Default Purchase Unit *</InputLabel>
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 1 }}>
          <Select defaultValue="Each (1)">
            <MenuItem value="Each (1)">Each (1)</MenuItem>
            <MenuItem value="Inner Pack (2)">Inner Pack (2)</MenuItem>
            <MenuItem value="Case (3)">Case (3)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Unit</TableCell>
                <TableCell>Base Unit</TableCell>
                <TableCell>Operation QTY</TableCell>
                <TableCell>Product Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Row 1 */}
              <TableRow>
                <TableCell>Each</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" value={1} fullWidth aria-readonly />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <TextField variant="outlined" size="small" fullWidth value={EachCode} />
                    <IconButton onClick={() => generateEachCode()}>
                      <SyncIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              {/* Row 2 */}
              <TableRow>
                <TableCell>Inner Pack</TableCell>
                <TableCell>
                  <Select fullWidth size="small" defaultValue="Each">
                    <MenuItem value="Each">Each</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" fullWidth />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <TextField variant="outlined" size="small" fullWidth value={innerPackCode} />
                    <IconButton onClick={() => generateinnerCode()}>
                      <SyncIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              {/* Row 3 */}
              <TableRow>
                <TableCell>Case</TableCell>
                <TableCell>
                  <Select fullWidth size="small" defaultValue="Inner Pack">
                    <MenuItem value="Each">Each</MenuItem>
                    <MenuItem value="Inner Pack">Inner Pack</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" fullWidth />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <TextField variant="outlined" size="small" fullWidth value={caseCode} />
                    <IconButton onClick={() => generateCaseCode()}>
                      <SyncIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: 'white',
            background: '#2277f5',
            fontSize: '16px',
            fontWeight: '600',
          }}
          fullWidth
          onClick={handlePrev}
        >
          Previous
        </Button>
      </Grid>
      <Grid item xs={12} md={8} sx={{ mt: 3 }}></Grid>
      <Grid item xs={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          fullWidth
          sx={{
            color: 'white',
            background: '#2277f5',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          Next Step
        </Button>
      </Grid>
    </Grid>
  );
};

export default Tab3;
