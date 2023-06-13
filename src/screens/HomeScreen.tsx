import React, { useEffect, useState, FC } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import HeaderComponent from '../components/HeaderComponent';
import ProductComponent from '../components/ProductComponent';
import { ApplicationState, Menu, Product, ProductState } from '../redux';
import { scale } from '../utils/scale';
import MenuComponent from '../components/MenuComponent';

interface HomeProps {
  productReducer: ProductState;
}

const HomeScreen: FC<HomeProps> = props => {
  const { productReducer } = props;
  const { products, menu } = productReducer;
  const [data, setData] = useState<Product[]>([]);
  const [menuData, setMenuData] = useState<Menu[]>([]);
  const [viewProduct, setViewProduct] = useState<Product>();
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    if (searchValue) {
      const updatedList = data.filter(product => {
        return product.name
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      });
      setData(updatedList);
    }
    else {
      setData(products)
    }
  }, [searchValue]);

  useEffect(() => {
    setData(products)
    setMenuData(menu)
  }, []);

  const toggleModal = (product: Product) => {
    setViewProduct(product);
    setModalVisible(!isModalVisible);
  };

  const renderMenu = ({ item }) => (
    <MenuComponent menu={item} /*callback={(product: Product) => toggleModal(product)} */ />
  );

  const renderProduct = ({ item }) => (
    <ProductComponent product={item} callback={(product: Product) => toggleModal(product)} />
  );

  return (
    <SafeAreaView>
      <HeaderComponent
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        search
        title="Home"
      />

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>

            <Image style={styles.imgStyle} source={{ uri: viewProduct?.img }} />
            <Text style={styles.textStyle}>{viewProduct?.name}</Text>

            <View style={styles.textRowstyle}>
              <Text style={styles.textStyle}>Price:</Text>
              <Text style={styles.textStyle}>{viewProduct?.price}</Text>
            </View>
            <View style={styles.textRowstyle}>
              <Text style={styles.textStyle}>Color:</Text>
              <Text style={styles.textStyle}>{viewProduct?.colour}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>CLOSE</Text>
            </TouchableOpacity>

          </View>


        </View>
      </Modal>


      <Text style={styles.title}>MENU</Text>

      <FlatList
        data={menuData}
        renderItem={renderMenu}
        horizontal
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.title}>Products</Text>

      <FlatList
        data={data}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </SafeAreaView>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  productReducer: state.productReducer
});

export default connect(mapToStateProps, {})(HomeScreen);

const styles = StyleSheet.create({
  title: {
    marginHorizontal: scale(20),
    marginTop: scale(5),
    fontSize: 20
  },
  modalView: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  modalContainer: {
    justifyContent: 'space-between', backgroundColor: '#ffffff', height: Dimensions.get('screen').height * 0.6, width: Dimensions.get('screen').width * 0.8
  },
  imgStyle: {
    height: Dimensions.get('screen').height * 0.4, width: '100%'
  },
  textStyle: {
    marginHorizontal: scale(10)
  },
  textRowstyle: {
    flexDirection: 'row'
  },
  buttonStyle: {
    width: '100%', backgroundColor: 'red', alignItems: 'center', padding: scale(10)
  },
  buttonTextStyle: {
    color: '#fff', fontSize: 16, fontWeight: '700'
  }
});
