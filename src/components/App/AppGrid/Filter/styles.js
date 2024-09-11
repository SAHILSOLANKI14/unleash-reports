import styled from 'styled-components';
import { makeStyles } from '@mui/styles';

import { Button } from 'src/components/shared';
import FilterListIcon from '@mui/icons-material/FilterList';
export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const FiltersLeft = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  flex: 1;
`;

export const FiltersRight = styled.div`
  display: flex;
`;

export const MoreButton = ({ onClick }) => {
  return (
    <Button
      size="small"
      variant="text"
      startIcon={<FilterListIcon />}
      onClick={onClick}
      disableElevation={true}
      // color="rgba(0, 0, 0, 0.06)"
      sx={{
        color: 'rgba(0, 0, 0, 0.6)',
        background: 'rgba(0, 0, 0, 0.06)',
        boxShadow: 'none',
        padding: '6px 8px',
        fontSize: '14px',
      }}
    >
      Filter by
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

export const menuStyles = makeStyles({
  paper: {
    boxShadow: 'none',
    background: 'transparent',
  },
});

export const buttonStyles = {
  boxShadow: 'none',
  padding: '4px 8px',
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.6)',
  textTransform: 'none',
  fontWeight: 400,
  backgroundColor: 'rgba(25, 118, 210, 0.08)',
};

export const buttonStylesDark = {
  boxShadow: 'none',
  padding: '4px 8px',
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.87)',
  textTransform: 'none',
  fontWeight: 400,
  backgroundColor: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.23)',
  borderRadius: '48px',
  padding: '8px 16px',
};

export const disabledButtonStyles = {
  boxShadow: 'none',
  padding: '4px 8px',
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.3)',
  textTransform: 'none',
  fontWeight: 400,
  // backgroundColor: 'rgba(25, 118, 210, 0.08)',
};

export const customMenuStyles = {
  maxHeight: '317px',
  overflowY: 'auto'
};