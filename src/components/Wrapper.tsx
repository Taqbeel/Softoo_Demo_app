import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { connect } from 'react-redux';
import { ApplicationState, CartState } from '../redux';

interface WrapperProps {
  children: any;
  cartReducer: CartState;
}

const Wrapper: FC<WrapperProps> = props => {
  const { children, cartReducer } = props;
  const { cart } = cartReducer;

  const saveCart = async () => {
    try {
      const cartJSON = JSON.stringify(cart);
      await AsyncStorage.setItem('cart', cartJSON);
    } catch (error) { }
  };

  useEffect(() => {
    if (Array.isArray(cart)) {
      saveCart();
    }
  }, [cart]);

  return <>{children}</>;
};

const mapToStateProps = (state: ApplicationState) => ({
  cartReducer: state.cartReducer
});

export default connect(mapToStateProps)(Wrapper);