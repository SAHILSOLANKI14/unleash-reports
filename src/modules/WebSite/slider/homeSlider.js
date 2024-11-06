import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import image1 from 'src/assets/images/apex (3).png';
import image2 from 'src/assets/images/apex (2).png';
import image3 from 'src/assets/images/apex (4).png';
import image4 from 'src/assets/images/apex.png';

const images = [image1, image2, image3, image4];

function AutoImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1440px',
        mx: 'auto',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        mt: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Slide ${index + 1}`}
            sx={{
              display: index === currentIndex ? 'block' : 'none',
              width: '100%',
              height: 'auto',
              maxHeight: '100%', // Adjust to fill container height
              objectFit: 'cover',
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        {images.map((_, index) => (
          <FiberManualRecordIcon
            key={index}
            fontSize="small"
            color={currentIndex === index ? 'primary' : 'disabled'}
            sx={{ cursor: 'pointer', mx: 0.5 }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default AutoImageSlider;
