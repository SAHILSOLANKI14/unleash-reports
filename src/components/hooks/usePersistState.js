import { useState, useEffect } from 'react';

export default (storageKey, initialState) => {
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    let persistedData = localStorage.getItem(storageKey);
    if (
      persistedData &&
      persistedData !== '' &&
      typeof persistedData !== 'undefined' &&
      persistedData != 'undefined'
    ) {
      setInternalState(JSON.parse(persistedData));
    }
  }, []);

  const setState = (newState) => {
    localStorage.setItem(storageKey, JSON.stringify(newState));
    setInternalState(newState);
  };

  return [state, setState];
};
