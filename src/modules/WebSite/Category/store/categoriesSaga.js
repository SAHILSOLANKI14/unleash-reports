import { call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
import {
  FETCH_CATEGORIES_REQUEST,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../store/categoriesAction';
import { fetchCategoriesData } from '../api/index';

function* fetchCategories() {
  try {
    const response = yield call(fetchCategoriesData);
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

export function* watchFetchCategories() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategories);
}
