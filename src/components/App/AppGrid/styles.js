import styled from 'styled-components';
import { Button } from 'src/components/shared';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Paper, Typography, Box, useTheme, Grid } from '@mui/material';

export const BulkActionIconButton = styled(Button).attrs({
  size: 'small',
  color: 'secondary',
  iconButton: true,
})`
  background-color: transparent;
  border: 1px solid #dddddd;
  padding: 4px;
  .MuiSvgIcon-root {
    font-size: 1.2em !important;
  }
`;

export const SelectedToolBar = styled.div`
  background-color: transparent;
`;

export const FiltersContainer = styled(Grid).attrs({
  container: true,
})`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const FiltersLeft = styled(Grid).attrs({
  xs: 12,
  md: 6,
})`
  display: flex;
`;

export const FiltersRight = styled(Grid).attrs({
  xs: 12,
  md: 6,
})`
  display: flex;
  justify-content: flex-end;
`;

export const MoreButton = ({ onClick, count }) => {
  const theme = useTheme();
  const options = {
    variant: parseInt(count) > 0 ? 'contained' : 'text',
    size: 'small',
    disableElevation: true,
    color: parseInt(count) > 0 ? 'secondary' : 'inherit',
  };

  return (
    <Button
      startIcon={<FilterListIcon />}
      onClick={onClick}
      {...options}
      sx={{
        background: parseInt(count) > 0 ? '#1976D2 !important' : 'rgba(25, 118, 210, 0.08)',
        boxShadow: 'none',
        padding: '6px 8px',
        color: parseInt(count) > 0 ? '#ffffff !important' : 'rgba(0, 0, 0, 0.6) !important',
        textTransform: 'none',
        fontWeight: 400,
      }}
    >
      <Typography noWrap sx={{ maxWidth: '144px' }} variant="body2">
        Advanced filters {count > 0 ? ` (${count})` : ''}
      </Typography>
    </Button>
  );
};

export const ExtraButton = ({ onClick, children }) => {
  return (
    <Button
      size="small"
      variant="text"
      onClick={onClick}
      disableElevation={true}
      // color="rgba(0, 0, 0, 0.06)"
      sx={{
        color: 'rgba(0, 0, 0, 0.3)',
        boxShadow: 'none',
      }}
    >
      {children}
    </Button>
  );
};

export const PaperContainer = styled.div`
  width: 284px;
  min-height: calc(100% - 300px);
  padding: 00px 16px;
`;

export const MenuPaper = ({ children, handleClear }) => {
  return (
    <PaperContainer>
      <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
        <Typography variant="h4">Filter by</Typography>
        <Button color="secondary" onClick={handleClear}>
          Clear all
        </Button>
      </Box>
      {children}
    </PaperContainer>
  );
};
