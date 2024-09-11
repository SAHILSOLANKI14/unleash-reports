import { styled } from '@mui/system';
import images from 'src/config/images';
import ListItemButton from '@mui/material/ListItemButton';
import theme from 'src/config/theme';

// Logo styling
export const Logo = styled('img')({
  maxWidth: '160px',
  marginLeft: '20px',
  paddingTop: 30,
  paddingBottom: 20,
});
Logo.defaultProps = {
  src: images.logoW,
};

// ListItem styling for main items and active states
export const ListItem = styled(ListItemButton)({
  '& .MuiListItemText-root': {
    color: '#2b3033', // Default text color
    opacity: 1,
    fontWeight: '600',
    '& .MuiTypography-root': {
      fontWeight: '500',
      fontSize: '14px !important',
      lineHeight: '15px !important',
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: '44px',
    opacity: 0.6,
    // color: theme.palette.secondary.main, // Default icon color
  },
  padding: '12px 24px',
  '&:hover, &.active': {
    '& .MuiListItemText-root': {
      color: theme.palette.secondary.main, // Change text color on hover and active
      opacity: 1,
      '& .MuiTypography-root': {
        fontWeight: 500,
      },
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.secondary.main, // Change icon color on hover and active
      opacity: 1,
    },
  },
  '&.active': {
    // Additional styling for active parent items
    backgroundColor: theme.palette.action.selected, // Highlight background for active item
  },
});

// Icon1 styling
export const Icon1 = styled('img')({
  position: 'absolute',
  bottom: '0px',
  left: '00px',
  width: '280px',
});
Icon1.defaultProps = {
  src: images.auth.icon,
};

// Additional styled component for child items in the dropdown
export const SubListItem = styled(ListItemButton)({
  padding: '8px 16px', // Adjust padding to your preference
  marginLeft: '16px',
  '& .MuiListItemIcon-root': {
    minWidth: '10px', // Reduce the width of the icon container
    marginRight: '4px', // Decrease the gap between icon and text
  },
  '& .MuiListItemText-root': {
    color: '#2b3033', // Default text color
    opacity: 0.8,
    fontWeight: '500',
    '& .MuiTypography-root': {
      fontSize: '14px !important',
      lineHeight: '15px !important',
    },
  },
  '&:hover, &.active': {
    '& .MuiListItemText-root': {
      color: theme.palette.secondary.main, // Change text color on hover and active
      opacity: 1,
      '& .MuiTypography-root': {
        fontWeight: 500,
      },
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.secondary.main, // Change icon color on hover and active
      opacity: 1,
    },
  },
});
