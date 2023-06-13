import React, { memo } from 'react';
import { FC } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, CartState, onAddItem, Product } from '../redux';
import { scale } from '../utils/scale';

interface ProductProps {
  product: Product;
  cartReducer: CartState;
  onAddItem: Function;
  callback: Function
}

const ProductComponent: FC<ProductProps> = props => {
  const { product, onAddItem, callback } = props;

  return (
    <View
      style={styles.product}>
      <Image style={styles.image} source={{ uri: product.img }} />
      <View style={styles.detail}>
        <Text>{product.name}</Text>
        <Text>${product.price}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => callback(product)}
            style={[styles.singleButtons, { backgroundColor: 'red' }]}>
            <Text style={styles.buttonText}>View Detail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onAddItem(product)}
            key={product.id}
            style={[styles.singleButtons, { backgroundColor: 'green' }]}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  cartReducer: state.cartReducer
});

export default connect(mapToStateProps, { onAddItem })(memo(ProductComponent));

const styles = StyleSheet.create({
  product: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: scale(15),
    alignItems: 'center',
    marginHorizontal: scale(15),
    borderRadius: scale(20),
    height: Dimensions.get('screen').width * 0.3,
    borderWidth: 0.5,
    borderColor: '#ffffff88',
    elevation: 2,
  },
  image: {
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').width * 0.3,
    borderRadius: scale(20),
    marginRight: scale(10)
  },
  detail: {
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: scale(5),
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  singleButtons: {
    flex: 1,
    marginHorizontal: scale(2),
    alignItems: 'center',
    padding: scale(10),
    borderRadius: scale(20),
  },
  buttonText: {
    color: '#fff'
  }
});
