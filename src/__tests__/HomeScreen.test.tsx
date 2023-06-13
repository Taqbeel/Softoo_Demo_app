import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('HomeScreen', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      productReducer: {
        products: [
          {
            id: '1',
            name: 'Product 1',
            price: 10,
            colour: 'Red',
            img: 'https://example.com/product1.jpg',
          },
          {
            id: '2',
            name: 'Product 2',
            price: 15,
            colour: 'Blue',
            img: 'https://example.com/product2.jpg',
          },
        ],
        menu: [
          {
            id: '1',
            name: 'Menu 1',
          },
          {
            id: '2',
            name: 'Menu 2',
          },
        ],
      },
    });
  });

  test('renders HomeScreen correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    // Test for the presence of specific elements or texts
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('MENU')).toBeTruthy();
    expect(getByText('Products')).toBeTruthy();
  });
});
