import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import loadingAnimation from '../../assets/animations/loading.json';
import Animation from '../../components/Animation';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList, AnimationContainer, SubmitButton } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  const catalogLoading = useSelector(state => state.catalog.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <>
      {loading ? (
        <AnimationContainer>
          <Animation animation={loadingAnimation} size={380} autoplay loop />
        </AnimationContainer>
      ) : (
        <ProductList>
          {products.map(product => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>

              <SubmitButton onClick={() => handleAddProduct(product.id)}>
                {catalogLoading.includes(product.id) ? (
                  <div className="spinner">
                    <FaSpinner color="#FFF" size={14} />
                  </div>
                ) : (
                  <div>
                    <MdShoppingCart size={16} color="#FFF" />{' '}
                    {amount[product.id] || 0}
                  </div>
                )}
                <span>ADICIONAR AO CARRINHO</span>
              </SubmitButton>
            </li>
          ))}
        </ProductList>
      )}
    </>
  );
}
