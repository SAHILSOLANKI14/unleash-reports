export const FETCH_PURCHASE_DATA_REQUEST = 'FETCH_PURCHASE_DATA_REQUEST';
export const FETCH_PURCHASE_DATA_SUCCESS = 'FETCH_PURCHASE_DATA_SUCCESS';
export const FETCH_PURCHASE_DATA_FAILURE = 'FETCH_PURCHASE_DATA_FAILURE';

export const FETCH_DETAIL_DATA_REQUEST = 'FETCH_DETAIL_DATA_REQUEST';
export const FETCH_DETAIL_DATA_SUCCESS = 'FETCH_DETAIL_DATA_SUCCESS';
export const FETCH_DETAIL_DATA_FAILURE = 'FETCH_DETAIL_DATA_FAILURE';

export const fetchPurchaseDataRequest = (pageNo, rowsPerPage) => ({
  type: FETCH_PURCHASE_DATA_REQUEST,
  payload: { pageNo, rowsPerPage },
});

export const fetchDetailDataRequest = (reference_no) => ({
  type: FETCH_DETAIL_DATA_REQUEST,
  payload: { reference_no },
});
