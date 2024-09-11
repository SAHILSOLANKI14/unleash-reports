import { useState, useEffect } from 'react';

export default function useViewport() {
  const [viewport, setViewPort] = useState(getViewport());
  useEffect(() => {
    function handleResize() {
      setViewPort(getViewport());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return viewport;
}

const getViewport = () => {
  const { innerWidth: width } = window;
  switch (true) {
    case width >= 1280:
      return 'lg';
      break;
    case width >= 992 && width < 1280:
      return 'md';
      break;
    case width >= 767 && width < 992:
      return 'sm';
      break;
    case width >= 480 && width < 767:
      return 'xs';
      break;
    case width < 480:
      return 'xxs';
      break;
  }
};

function getWindowWidth() {}
