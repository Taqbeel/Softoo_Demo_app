import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { memo } from 'react';
import { Dimensions, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  ApplicationState,
  CartState,
  onAddItem,
  onReduceQuantity,
  onRemoveItem,
  onResetCart,
  Product
} from '../redux';
import { scale } from '../utils/scale';

interface CartComponentProps {
  item: Product;
  onAddItem: Function;
  onRemoveItem: Function;
  onResetCart: Function;
  onReduceQuantity: Function;
  cartReducer: CartState;
}

const CartComponent: FC<CartComponentProps> = props => {
  const { item, onAddItem, onRemoveItem, onReduceQuantity, cartReducer } = props;

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setReRender(!reRender);
  }, [cartReducer.cart]);

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image]}
        source={{
          uri: item.img + item.id
        }}
      />

      <View style={styles.detail}>
        <Text numberOfLines={2}>
          {item.name}
        </Text>
        <Text>
          Price: ${item.price}
        </Text>


        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => {
              item.quantity === 1
                ? onRemoveItem(item.id)
                : onReduceQuantity(item.id);
            }}
            style={{ backgroundColor: '#000', width: scale(25), borderRadius: scale(10), alignItems: 'center', justifyContent: 'center' }}

          >
            <Text style={[styles.quantityButton, { color: '#fff' }]}>
              -
            </Text>
          </TouchableOpacity>
          <Text style={styles.quantityButton}>
            {item.quantity && item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => onAddItem(item)}
            style={{ backgroundColor: '#000', width: scale(25), borderRadius: scale(10), alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={[styles.quantityButton, { color: '#fff' }]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
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
})(CartComponent);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.95,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: scale(15),
    alignSelf: 'center',
    borderRadius: scale(10),
    paddingHorizontal: scale(5),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').width * 0.3,
    borderRadius: scale(20),
    marginRight: scale(10)
  },
  detail: {
    flex: 1
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(40),
    marginTop: scale(5)
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: '700'
  },
  counter: {
    color: '#fff',
    fontSize: 18
  }
});
