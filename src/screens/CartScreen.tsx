import React from 'react';
import { FC } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import CartComponent from '../components/CartComponent';
import HeaderComponent from '../components/HeaderComponent';
import {
  ApplicationState,
  CartState,
  onAddItem,
  onReduceQuantity,
  onRemoveItem,
  onResetCart,
} from '../redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../utils/scale';

const TAX_RATE = 18 / 100;

interface CartProps {
  cartReducer: CartState;
  onAddItem: Function;
  onRemoveItem: Function;
  onResetCart: Function;
  onReduceQuantity: Function;
}

const CartScreen: FC<CartProps> = props => {
  const { cartReducer, onResetCart, onRemoveItem } = props;

  const { cart } = cartReducer;

  const totalPrice = () => {
    let total = 0;
    cart.map(product => {
      return (total = total + product?.quantity * Number(product.price));
    });
    return total;
  };

  const checkout = () => {
    Alert.alert(
      'Success',
      'Your order has been laced',
      [
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => onResetCart()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent
        titleStyle={{ width: '100%', textAlign: 'center' }}
        burgerStyle={{ right: 30 }}
        title="My Cart"
        reset={Array.isArray(cart) && cart.length > 0}
        onReset={() => onResetCart()}
      />
      {Array.isArray(cart) && cart.length > 0 ? (
        <>
          <SwipeListView
            contentContainerStyle={styles.container}
            data={cart}
            renderItem={(data, rowMap) => <CartComponent item={data.item} />}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  onPress={() => onRemoveItem(data.item.id)}
                  style={styles.deleteButton}>
                  <MaterialIcons size={45} name="delete" color="white" />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe
            leftOpenValue={75}
            rightOpenValue={-75}
          />

          <View style={styles.priceContainer}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
              $
              {(
                Number(totalPrice())
              ).toFixed(2)}
            </Text>
            <TouchableOpacity
              onPress={checkout}
              style={styles.checkout}>

              <Text style={{ color: '#fff' }}>
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            Cart is empty
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  cartReducer: state.cartReducer
});

export default connect(mapToStateProps, {
  onAddItem,
  onRemoveItem,
  onResetCart,
  onReduceQuantity
})(CartScreen);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 150,
    marginTop: 10
  },
  rowFront: {
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subPrices: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20
  },
  rowBack: {
    width: '95%',
    flexDirection: 'row',
    backgroundColor: 'red',
    height: Dimensions.get('screen').width * 0.25,
    marginTop: scale(25),
    alignSelf: 'center',
    borderRadius: scale(10),
    paddingHorizontal: scale(5),
    justifyContent: 'space-around'
  },
  priceContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    width: '100%',
    padding: scale(20),
    borderTopWidth: 0.2,
    borderTopColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  checkout: {
    backgroundColor: 'green',
    borderRadius: scale(20),
    paddingHorizontal: scale(30),
    paddingVertical: scale(10),
  }
});
