import { all } from 'redux-saga/effects';
import AuthSagas from 'src/modules/auth/store/authSaga';
import watchCheckoutSaga from 'src/modules/WebSite/WebCart/Store/CheckoutSaga';
import { watchPurchaseData } from 'src/modules/Purchase/Store/PurchaseSaga';
import watchAddressSaga from 'src/modules/WebSite/WebCart/Store/Addresaga';
import cartSaga from 'src/modules/WebSite/WebCart/Store/CartSaga';
import SalesSaga from 'src/modules/Sales/store/SalesSaga';
import {watchFetchCategories} from 'src/modules/WebSite/Category/store/categoriesSaga';
function* rootSaga() {
  yield all([
    AuthSagas(),
    watchCheckoutSaga(),
    watchPurchaseData(),
    watchAddressSaga(),
    cartSaga(),
    SalesSaga(),
    watchFetchCategories(),
  ]);
}

export default rootSaga;
