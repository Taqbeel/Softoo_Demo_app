import { Menu, Product } from './../models/index';
import axios from 'axios';
import { Dispatch } from 'react';
import API from '../../API/API';

export interface GetProductAction {
  readonly type: 'PRODUCT_FETCH_SUCCESS';
  payload: Product;
}

export interface GetMenuAction {
  readonly type: 'Menu_FETCH_SUCCESS';
  payload: Menu;
}

export interface ProductErrorAction {
  readonly type: 'PRODUCT_FETCH_ERROR';
  payload: any;
}

export type ProductAction =
  | GetProductAction
  | GetMenuAction
  | ProductErrorAction

export const getProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await axios.get<Product>(API.products);
      console.log('response', response.data)

      if (!response) {
        dispatch({
          type: 'PRODUCT_FETCH_ERROR',
          payload: 'Error while fetching products'
        });
      } else {
        dispatch({
          type: 'PRODUCT_FETCH_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      console.log('getProducts', error);
      dispatch({
        type: 'PRODUCT_FETCH_ERROR',
        payload: error
      });
      throw error;
    }
  };
};

export const getMenu = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await axios.get<Menu>(API.menu);
      console.log('response', response.data)

      if (!response) {
        dispatch({
          type: 'PRODUCT_FETCH_ERROR',
          payload: 'Error while fetching product timing'
        });
      } else {
        dispatch({
          type: 'Menu_FETCH_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      console.log('GetMenuAction', error);
      dispatch({
        type: 'PRODUCT_FETCH_ERROR',
        payload: error
      });
      throw error;
    }
  };
};