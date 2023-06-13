import {combineReducers} from 'redux';
import {CartReducer} from './cartReducer';
import {ProductReducer} from './productReducer';

const rootReducer = combineReducers({
  cartReducer: CartReducer,
  productReducer: ProductReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
