import React from 'react';
import { FC } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../utils/scale';

interface SearchBarProps {
  value: string;
  setValue: Function;
}
const SearchBar: FC<SearchBarProps> = props => {
  const { value, setValue } = props;

  return (
    <View style={styles.inputBox}>
      <MaterialIcons size={30} name="search" color={'#000'} style={{ marginRight: scale(10) }} />

      <TextInput
        value={value}
        onChangeText={(val) => setValue(val)}
        placeholder="Search"
        style={[styles.input]}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputBox: {
    width: Dimensions.get('screen').width * 0.7,
    flexDirection: 'row',
    height: scale(35),
    alignItems: 'center',
    borderRadius: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: 'white',
  },
  input: {
    padding: 0
  }
});
