import React from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import {
  Container,
  ProductList,
  ProductWrapper,
  Product,
  ProductImage,
  ProductTextContainer,
  ProductTitle,
  ProductPrice,
  ProductRemove,
  PurchaseButton,
  PurchaseButtonText,
  Total,
  TotalText,
  TotalPrice,
  AmountWrapper,
  AmountSelect,
  AmountNumber,
  AmountControlButton,
  AmountTotal,
  AmountTotalText,
  EmptyCart,
  EmptyCartText,
} from './styles';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ScrollView>
        <ProductList>
          {cart.map(product => (
            <ProductWrapper key={product.id}>
              <Product>
                <ProductImage
                  source={{
                    uri: product.image,
                  }}
                />
                <ProductTextContainer>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>{product.priceFormatted}</ProductPrice>
                </ProductTextContainer>
                <ProductRemove
                  onPress={() =>
                    dispatch(CartActions.removeFromCart(product.id))
                  }
                >
                  <Icon name="delete-forever" color="#7159c1" size={24} />
                </ProductRemove>
              </Product>
              <AmountWrapper>
                <AmountSelect>
                  <AmountControlButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7159c1"
                    />
                  </AmountControlButton>
                  <AmountNumber value={String(product.amount)} />
                  <AmountControlButton onPress={() => increment(product)}>
                    <Icon name="add-circle-outline" size={20} color="#7159c1" />
                  </AmountControlButton>
                </AmountSelect>
                <AmountTotal>
                  <AmountTotalText>{product.subtotal}</AmountTotalText>
                </AmountTotal>
              </AmountWrapper>
            </ProductWrapper>
          ))}

          {cart.length === 0 ? (
            <EmptyCart>
              <Icon name="remove-shopping-cart" color="gray" size={60} />
              <EmptyCartText>Seu carrinho está vazio :(</EmptyCartText>
            </EmptyCart>
          ) : (
            <Total>
              <TotalText>Total</TotalText>
              <TotalPrice>{total}</TotalPrice>
              <PurchaseButton>
                <PurchaseButtonText>Finalizar pedido</PurchaseButtonText>
              </PurchaseButton>
            </Total>
          )}
        </ProductList>
      </ScrollView>
    </Container>
  );
}
