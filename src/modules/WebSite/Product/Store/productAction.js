export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const FETCH_PRODUCTCATE_REQUEST = 'FETCH_PRODUCTCATE_REQUEST';
export const FETCH_PRODUCTCATE_SUCCESS = 'FETCH_PRODUCTCATE_SUCCESS';
export const FETCH_PRODUCTCATE_FAILURE = 'FETCH_PRODUCTCATE_FAILURE';

export const fetchProductRequest = (productId) => ({
  type: FETCH_PRODUCT_REQUEST,
  payload: productId,
});

export const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductFailure = (error) => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: error,
});

export const fetchProductCateRequest = (CategtoyID) => ({
  type: FETCH_PRODUCTCATE_REQUEST,
  payload: CategtoyID,
});

export const fetchProductCateSuccess = (product) => ({
  type: FETCH_PRODUCTCATE_SUCCESS,
  payload: product,
});

export const fetchProductCateFailure = (error) => ({
  type: FETCH_PRODUCTCATE_FAILURE,
  payload: error,
});


