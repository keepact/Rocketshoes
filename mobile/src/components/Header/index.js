import React from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  HomeButton,
  Cart,
  HeaderImage,
  ProductCartItem,
} from './styles';

import logo from '../../assets/images/logo.png';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);

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
