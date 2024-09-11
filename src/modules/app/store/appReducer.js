import * as appTypes from './appTypes';

const initialState = {
  appLoading: true,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case appTypes.SET_APP_LOADING:
      return { ...state, appLoading: payload.loading };
    default:
      return state;
  }
};
