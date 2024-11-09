export const FETCH_ADDRESS_REQUEST = 'FETCH_ADDRESS_REQUEST';
export const FETCH_ADDRESS_SUCCESS = 'FETCH_ADDRESS_SUCCESS';
export const FETCH_ADDRESS_FAILURE = 'FETCH_ADDRESS_FAILURE';


export const fetchDetailDataRequest = (payload) => ({
    type: FETCH_ADDRESS_REQUEST,
    payload,
  });
  
  export const fetchAddressSuccess = (addressData) => ({
    type: FETCH_ADDRESS_SUCCESS,
    payload: addressData,
  });
  
  export const fetchAddressFailure = (error) => ({
    type: FETCH_ADDRESS_FAILURE,
    payload: error,
  });