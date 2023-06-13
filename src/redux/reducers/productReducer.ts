import { Menu, Product, ProductState } from './../models/index';
import { ProductAction } from '../actions';

const initialState = {
  products: {} as [Product],
  menu: {} as [Menu],
  error: ''
};

const ProductReducer = (
  state: ProductState = initialState,
  action: ProductAction
) => {
  switch (action.type) {
    case 'PRODUCT_FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload
      };
    case 'Menu_FETCH_SUCCESS':
      return {
        ...state,
        menu: action.payload
      };
    case 'PRODUCT_FETCH_ERROR':
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export { ProductReducer };
