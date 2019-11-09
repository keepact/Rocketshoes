import React from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  HomeButton,
  Cart,
  HeaderImage,
  ProductCartItem,
} from './styles';

import logo from '../../assets/logo.png';

function Header({ navigation, cartSize }) {
  return (
    <Container>
      <HomeButton onPress={() => navigation.navigate('Home')}>
        <HeaderImage source={logo} />
      </HomeButton>
      <Cart onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />

        <ProductCartItem>{cartSize}</ProductCartItem>
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
