import { enqueueSnackbar } from 'notistack';

const allowedPositions = ['tl', 'tc', 'tr', 'bl', 'bc', 'br'];

const getAnchorOrigin = (position) => {
  let vertical, horizontal;
  // position = allowedPositions.includes(position) ? position : 'tr';
  position = 'tc';
  vertical = position[0] === 'b' ? 'bottom' : 'top';
  horizontal = position[1] === 'l' ? 'left' : position[1] === 'c' ? 'center' : 'right';
  return { vertical, horizontal };
};

const success = (message, position) => {
  enqueueSnackbar(message, {
    variant: 'success',
    anchorOrigin: getAnchorOrigin(position),
  });
};

const error = (message, position) => {
  enqueueSnackbar(message, {
    variant: 'error',
    anchorOrigin: getAnchorOrigin(position),
  });
};

const info = (message, position) => {
  enqueueSnackbar(message, {
    variant: 'info',
    anchorOrigin: getAnchorOrigin(position),
  });
};

const warning = (message, position) => {
  enqueueSnackbar(message, {
    variant: 'warning',
    anchorOrigin: getAnchorOrigin(position),
  });
};

export default { error, success, info, warning };
