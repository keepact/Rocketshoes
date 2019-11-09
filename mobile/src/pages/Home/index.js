import React, { Component } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount, loading } = this.props;

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

              <SubmitProduct onPress={() => this.handleAddProduct(item.id)}>
                <ProductBasket>
                  {loading ? (
                    <ActivityIndicator color="black" />
                  ) : (
                    <>
                      <Icon name="add-shopping-cart" color="#FFF" size={22} />
                      <ProductAmount>{amount[item.id] || 0}</ProductAmount>
                    </>
                  )}
                </ProductBasket>
                <ProductBasketText>ADICIONAR</ProductBasketText>
              </SubmitProduct>
            </ProductList>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
  loading: state.cart.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
