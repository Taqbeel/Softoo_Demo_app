import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-native';
import CartScreen from '../screens/CartScreen';

describe('CartScreen', () => {
  const mockCartReducer = {
    cart: [
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 20, quantity: 3 },
    ],
  };

  const mockResetCart = jest.fn();
  const mockRemoveItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the "Cart is empty" message when cart is empty', () => {
    const wrapper = shallow(
      <CartScreen
        cartReducer={{ cart: [] }}
        onResetCart={mockResetCart}
        onRemoveItem={mockRemoveItem}
      />
    );

    expect(wrapper.find('Text').text()).toEqual('Cart is empty');
  });

  it('renders the cart items and total price when cart is not empty', () => {
    const wrapper = shallow(
      <CartScreen
        cartReducer={mockCartReducer}
        onResetCart={mockResetCart}
        onRemoveItem={mockRemoveItem}
      />
    );

    expect(wrapper.find('CartComponent')).toHaveLength(mockCartReducer.cart.length);
    expect(wrapper.find('Text').text()).toContain('Total Price: $');
  });

  it('calls the onResetCart function when reset button is clicked', () => {
    const wrapper = shallow(
      <CartScreen
        cartReducer={mockCartReducer}
        onResetCart={mockResetCart}
        onRemoveItem={mockRemoveItem}
      />
    );

    wrapper.find('HeaderComponent').prop('onReset')();

    expect(mockResetCart).toHaveBeenCalledTimes(1);
  });

  it('calls the onResetCart function and displays the alert when checkout button is clicked', () => {
    const wrapper = shallow(
      <CartScreen
        cartReducer={mockCartReducer}
        onResetCart={mockResetCart}
        onRemoveItem={mockRemoveItem}
      />
    );

    const checkoutButton = wrapper.find('TouchableOpacity');
    checkoutButton.simulate('press');

    expect(Alert.alert).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Success',
      'Your order has been laced',
      [
        {
          text: 'OK',
          style: 'destructive',
          onPress: expect.any(Function),
        },
      ]
    );

    const alertButtonIndex = 0;
    const alertButtonHandler = Alert.alert.mock.calls[0][2][alertButtonIndex].onPress;
    alertButtonHandler();

    expect(mockResetCart).toHaveBeenCalledTimes(1);
  });

  it('calls the onRemoveItem function when delete button is clicked', () => {
    const wrapper = shallow(
      <CartScreen
        cartReducer={mockCartReducer}
        onResetCart={mockResetCart}
        onRemoveItem={mockRemoveItem}
      />
    );

    const swipeListView = wrapper.find('SwipeListView');
    const deleteButton = shallow(swipeListView.prop('renderHiddenItem')({ item: mockCartReducer.cart[0] }));

    deleteButton.simulate('press');

    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalledWith(mockCartReducer.cart[0].id);
  });
});
