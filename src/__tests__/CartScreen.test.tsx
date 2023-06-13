import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartScreen from '../screens/CartScreen';

const mockStore = configureStore([]);

describe('CartScreen', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cartReducer: {
        cart: [
          {
            id: '1',
            name: 'Product 1',
            price: 10,
            quantity: 1
          },
          {
            id: '2',
            name: 'Product 2',
            price: 20,
            quantity: 2
          }
        ]
      }
    });
  });

  it('should render CartScreen correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    // Assert the presence of specific elements
    expect(getByText('My Cart')).toBeTruthy();
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
  });

  it('should display total price correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    // Assert the total price calculation
    expect(getByText('$50.00')).toBeTruthy();
  });

  it('should call onResetCart when reset button is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    // Simulate button click
    fireEvent.press(getByText('Reset'));

    // Assert that onResetCart has been called
    const actions = store.getActions();
    expect(actions[0].type).toEqual('RESET_CART');
  });

  it('should call onRemoveItem when delete button is pressed', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    // Simulate button click
    fireEvent.press(getByTestId('delete-button-1'));

    // Assert that onRemoveItem has been called
    const actions = store.getActions();
    expect(actions[0].type).toEqual('REMOVE_ITEM');
    expect(actions[0].payload).toEqual('1');
  });

  it('should call checkout function when checkout button is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    // Simulate button click
    fireEvent.press(getByText('Check Out'));

    // Assert that checkout function has been called
    const actions = store.getActions();
    expect(actions[0].type).toEqual('RESET_CART');

    // Assert the alert message
    expect(getByText('Your order has been placed')).toBeTruthy();
  });
});
