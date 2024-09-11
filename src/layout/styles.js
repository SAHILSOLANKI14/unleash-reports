import { styled } from '@mui/system';
import images from 'src/config/images';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export const AuthContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const AuthBg = styled('div')({
  // marginTop: 60,
  flex: 1,
});

export const Left = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'column',
  position: 'relative',
});

export const Right = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AuthContent = styled('div')({
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(60px)',
  padding: '64px 50px',
  maxWidth: 340,
});

export const Logo = styled('img')({
  width: '23%',
});
Logo.defaultProps = {
  src: images.logoW,
};

export const Icon1 = styled('img')({
  position: 'absolute',
  bottom: '-10px',
  right: '00px',
});
Icon1.defaultProps = {
  src: images.auth.icon,
};

export const Icon2 = styled('img')({});
Icon2.defaultProps = {
  src: images.auth.login1,
};
