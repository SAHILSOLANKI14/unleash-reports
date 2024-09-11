import React from 'react';
import { styled } from '@mui/system';
import images from 'src/config/images';

function AppLoader() {
  return (
    <div>
      <div className="wrapper">
        <div className="page-content">
          <section className="desktop-front-bg">
            <LoadingContainer>
              <LoadingLogo src={images.logo} className="loadingAnimation" />
            </LoadingContainer>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AppLoader;

export const LoadingContainer = styled('div')({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const LoadingLogo = styled('img')({
  width: '240px',
});
