/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBar from './SearchBar';
import { scale } from '../utils/scale';

interface HeaderProps {
  title: string;
  titleStyle?: object;
  burgerStyle?: object;
  reset?: boolean;
  onReset?: Function;
  search?: boolean;
  searchValue?: string;
  setSearchValue?: Function;
}

const HeaderComponent: FC<HeaderProps> = props => {
  const navigation = useNavigation<any>();
  const {
    title,
    titleStyle,
    burgerStyle,
    reset,
    onReset,
    search,
    searchValue,
    setSearchValue
  } = props;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {title}
      </Text>
      {search && <SearchBar value={searchValue || ""} setValue={setSearchValue} />}

      {reset && (
        <TouchableOpacity
          onPress={onReset}>
          <MaterialIcons size={30} name='delete' color='red' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(HeaderComponent);

const styles = StyleSheet.create({
  container: {
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    backgroundColor: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 0.1,
    elevation: 2
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold'
  }
});
