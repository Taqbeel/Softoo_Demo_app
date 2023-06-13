import AsyncStorage from '@react-native-community/async-storage';
import React, { FC, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  getProducts,
  getMenu,
  updateCart
} from '../redux';

interface SplashProps {
  loading: boolean;
  setLoading: Function;
  getProducts: Function;
  getMenu: Function;
  updateCart: Function;
}

const SplashScreen: FC<SplashProps> = props => {
  const { setLoading, getProducts, getMenu, updateCart } =
    props;

  const getCart = async () => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      if (cart) {
        cart = JSON.parse(cart);

        updateCart(cart);
      }
    } catch (error) { }
  };

  const fetchData = async () => {
    try {
      await getProducts();
      await getMenu();
      await getCart();

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default connect(null, {
  getProducts,
  getMenu,
  updateCart
})(SplashScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
