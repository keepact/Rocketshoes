import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';

import {
  Container,
  ProductImage,
  ProductList,
  ProductTitle,
  ProductPrice,
  ProductBasket,
  SubmitProduct,
  ProductBasketText,
  ProductAmount,
} from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sunAmount, product) => {
      sunAmount[product.id] = product.amount;

      return sunAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductList key={item.id}>
            <ProductImage
              source={{
                uri: item.image,
              }}
            />
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>{item.priceFormatted}</ProductPrice>

            <SubmitProduct onPress={() => handleAddProduct(item.id)}>
              <ProductBasket>
                <Icon name="add-shopping-cart" color="#FFF" size={22} />
                <ProductAmount>{amount[item.id] || 0}</ProductAmount>
              </ProductBasket>
              <ProductBasketText>ADICIONAR</ProductBasketText>
            </SubmitProduct>
          </ProductList>
        )}
      />
    </Container>
  );
}
