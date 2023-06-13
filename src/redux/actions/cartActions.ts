import { Product } from '../models/index';
import { Dispatch } from 'react';

export interface AddItemAction {
  readonly type: 'ON_ADD_ITEM';
  payload: Product;
}

export interface RemoveItemAction {
  readonly type: 'ON_REMOVE_ITEM';
  payload: string;
}

export interface ResetCartAction {
  readonly type: 'ON_RESET_CART';
}
export interface ReduceQuantityAction {
  readonly type: 'ON_REDUCE_QUANTITY';
  payload: string;
}
export interface UpdateCartAction {
  readonly type: 'ON_UPDATE_CART';
  payload: [Product];
}

export type CartAction =
  | AddItemAction
  | RemoveItemAction
  | ResetCartAction
  | ReduceQuantityAction
  | UpdateCartAction;

export const onAddItem = (item: Product) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_ADD_ITEM',
      payload: item
    });
  };
};

export const onRemoveItem = (id: string) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_REMOVE_ITEM',
      payload: id
    });
  };
};

export const onResetCart = () => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_RESET_CART'
    });
  };
};

export const onReduceQuantity = (id: string) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_REDUCE_QUANTITY',
      payload: id
    });
  };
};

export const updateCart = (list: [Product]) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_UPDATE_CART',
      payload: list
    });
  };
};
