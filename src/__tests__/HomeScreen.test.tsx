import React from 'react';
import { shallow } from 'enzyme';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('should initialize state variables correctly', () => {
    const wrapper = shallow(<HomeScreen />);
    const state = wrapper.state();

    expect(state.data).toEqual([]);
    expect(state.menuData).toEqual([]);
    expect(state.viewProduct).toBeUndefined();
    expect(state.searchValue).toEqual('');
    expect(state.isModalVisible).toBe(false);
  });

  it('should update searchValue state and filter data on search', () => {
    const wrapper = shallow(<HomeScreen />);
    const instance = wrapper.instance();

    instance.setState({ data: [{ name: 'Product 1' }, { name: 'Product 2' }] });
    instance.handleSearch('Product 1');

    expect(wrapper.state('searchValue')).toEqual('Product 1');
    expect(wrapper.state('data')).toEqual([{ name: 'Product 1' }]);
  });

  it('should toggle modal visibility and update viewProduct state', () => {
    const wrapper = shallow(<HomeScreen />);
    const instance = wrapper.instance();
    const product = { name: 'Product 1' };

    instance.toggleModal(product);

    expect(wrapper.state('isModalVisible')).toBe(true);
    expect(wrapper.state('viewProduct')).toEqual(product);

    instance.toggleModal(product);

    expect(wrapper.state('isModalVisible')).toBe(false);
    expect(wrapper.state('viewProduct')).toBeUndefined();
  });
});
