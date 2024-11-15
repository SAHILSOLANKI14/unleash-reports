import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios';

function AutoImageSlider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://dev.unleashpos.com/api.php?action=slider_image');
        console.log('API response:', response.data);
        if (response.data && Array.isArray(response.data.data)) {
          const imageUrls = response.data.data.map((item) => item.image);
          setImages(imageUrls);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        mx: 'auto',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{
                display: index === currentIndex ? 'block' : 'none',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transition: 'opacity 1s ease',
              }}
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {images.map((_, index) => (
          <FiberManualRecordIcon
            key={index}
            fontSize="small"
            color={currentIndex === index ? '#2277f5' : 'disabled'}
            sx={{
              cursor: 'pointer',
              mx: 0.5,
              border: currentIndex === index ? '2px solid #2277f5' : '1px solid #cccccc',
              borderRadius: '25px',
              fontSize: '12px',
              color: currentIndex === index ? '#2277f5' : '#cccccc',
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default AutoImageSlider;
