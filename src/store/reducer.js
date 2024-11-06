import { combineReducers } from 'redux';
import AuthReducer from 'src/modules/auth/store/authReducer';
import AppReducer from 'src/modules/app/store/appReducer';
import salesReducer from 'src/modules/Sales/store/SalesReducer';
import supplierReducer from 'src/modules/Suppliers/Store/SupplierReducer';
import CategoriesReducer from 'src/modules/Categories/Store/productsReducer';
import PurchaseReducer from 'src/modules/Purchase/Store/PurchaseReducer';
// import productReducer from 'src/modules/POS/Store/POSReducer';
import cartreducer from 'src/modules/WebSite/Product/Store/productSlice';
const createRootReducer = () =>
  combineReducers({
    // router: connectRouter(),
    app: AppReducer,
    auth: AuthReducer,
    sales: salesReducer,
    product: CategoriesReducer,
    suppliers: supplierReducer,
    purchases: PurchaseReducer,
    cart: cartreducer,
    // POSproductReducer: productReducer,
  });

export default createRootReducer;
