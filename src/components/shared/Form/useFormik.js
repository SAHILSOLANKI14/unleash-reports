import React, { createContext, useContext } from 'react';
import * as Yup from 'yup';

const RadFormikContext = createContext({
  validationSchema: Yup.object(),
});

export const useRadFormikContext = () => useContext(RadFormikContext);

export const RadFormik = ({ validationSchema, children }) => {
  const contextValue = validationSchema;

  return <RadFormikContext.Provider value={contextValue}>{children}</RadFormikContext.Provider>;
};
