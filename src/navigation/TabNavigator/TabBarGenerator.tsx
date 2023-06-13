import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ApplicationState, CartState } from '../../redux';
import { FC } from 'react';
import { scale } from '../../utils/scale';

interface TabBarGeneratorProps {
  route: any;
  focused: boolean;
  cartReducer: CartState;
}

const TabBarGenerator: FC<TabBarGeneratorProps> = props => {

  const { route, focused, cartReducer } = props;
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (Array.isArray(cartReducer.cart)) {
      let total = 0;
      cartReducer.cart.map(product => {
        return (total = total + product.quantity);
      });
      setTotalQuantity(total);
    }
  }, [cartReducer.cart]);

  return route.name === 'HomeScreen' ? (

    <MaterialIcons
      size={30}
      name="home-filled"
      color={focused ? '#fff' : '#000'}
    />

  ) : route.name === 'CartScreen' ? (

    <View>
      {totalQuantity > 0 && (
        <View
          style={styles.unfocusQuantity}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            {totalQuantity <= 9 ? totalQuantity : '9+'}
          </Text>
        </View>
      )}
      <MaterialIcons
        size={30}
        name="shopping-cart"
        color={focused ? '#fff' : '#000'}
      />
    </View>

  ) : (
    <></>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  cartReducer: state.cartReducer
});

export default connect(mapToStateProps)(TabBarGenerator);

const styles = StyleSheet.create({
  tabIconContaner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10
  },
  label: {
    marginLeft: 5
  },
  unfocusQuantity: {
    position: 'absolute',
    top: -scale(20),
    right: -scale(20),
    backgroundColor: '#fff',
    padding: scale(5),
    borderRadius: scale(50),
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }
});
