import React, { memo } from 'react';
import { FC } from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, Menu } from '../redux';
import { scale } from '../utils/scale';

interface MenuProps {
    menu: Menu;
}

const MenuComponent: FC<MenuProps> = props => {
    const { menu } = props;

    return (
        <View style={styles.product}>
            <Image style={styles.image} source={{ uri: menu.img }} />
        </View>
    );
};

const mapToStateProps = (state: ApplicationState) => ({

});

export default connect(mapToStateProps, {})(memo(MenuComponent));

const styles = StyleSheet.create({
    product: {
        marginTop: scale(15),
        marginHorizontal: scale(15),
        borderRadius: scale(20),
        borderWidth: 0.5,
        borderColor: '#ffffff88',
        elevation: 2,
    },
    image: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(20),
    },
});
