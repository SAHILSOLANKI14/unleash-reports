import { combineReducers } from 'redux';
import AuthReducer from 'src/modules/auth/store/authReducer';
import AppReducer from 'src/modules/app/store/appReducer';
import { salesReducer } from 'src/modules/Sales/store/SalesReducer';
import supplierReducer from 'src/modules/Suppliers/Store/SupplierReducer';
import CategoriesReducer from 'src/modules/Categories/Store/productsReducer';
import PurchaseReducer from 'src/modules/Purchase/Store/PurchaseReducer';
// import productReducer from 'src/modules/POS/Store/POSReducer';
import cartreducer from 'src/modules/WebSite/Product/Store/productSlice';
import authReducer from 'src/modules/WebSite/Auth/Store/authslice';
import checkoutReducer from 'src/modules/WebSite/WebCart/Store/CheckoutReducer';
import addressReducer from 'src/modules/WebSite/WebCart/Store/AddReducer';
import { cartReducer } from 'src/modules/WebSite/WebCart/Store/CartReducer';
import categoryReducer from 'src/modules/WebSite/Category/store/CategoriesReducer';
const createRootReducer = () =>
  combineReducers({
    // router: connectRouter(),
    app: AppReducer,
    auth: AuthReducer,
    salesData: salesReducer,
    product: CategoriesReducer,
    suppliers: supplierReducer,
    purchase: PurchaseReducer,
    category: categoryReducer,
    WebAuth: authReducer,
    checkout: checkoutReducer,
    address: addressReducer,
    cart: cartReducer,
    // POSproductReducer: productReducer,
  });

export default createRootReducer;
