import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import Animation from '../../components/Animation';
import emptyAnimation from '../../assets/animations/empty-cart.json';
import successAnimation from '../../assets/animations/sending-success.json';

import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable, Total, AnimationContainer } from './styles';

export default function Cart() {
  const [finished, setFinished] = useState(false);

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
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

  function handleFinhesed() {
    setFinished(true);

    window.setTimeout(() => {
      window.location.href = 'http://localhost:3000';
    }, 2500);
  }

  return (
    <Container>
      {finished ? (
        <AnimationContainer>
          <Animation animation={successAnimation} size={200} autoplay={false} />
          <h2>Sua compra foi processada, obrigado pela confiança!</h2>
        </AnimationContainer>
      ) : (
        <>
          {cart.length > 0 ? (
            <>
              <ProductTable>
                <thead>
                  <tr>
                    <th />
                    <th>PRODUTO</th>
                    <th>QTD</th>
                    <th>SUBTOTAL</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cart.map(product => (
                    <tr>
                      <td>
                        <img src={product.image} alt={product.title} />
                      </td>
                      <td>
                        <strong>{product.title}</strong>
                        <span>{product.priceFormatted}</span>
                      </td>
                      <td>
                        <div>
                          <button
                            type="button"
                            onClick={() => decrement(product)}
                          >
                            <MdRemoveCircleOutline size={20} color="#7159c1" />
                          </button>
                          <input
                            type="number"
                            readOnly
                            value={product.amount}
                          />
                          <button
                            type="button"
                            onClick={() => increment(product)}
                          >
                            <MdAddCircleOutline size={20} color="#7159c1" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <strong>{product.subtotal}</strong>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(CartActions.removeFromCart(product.id))
                          }
                        >
                          <MdDelete size={20} color="#7159c1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ProductTable>

              <footer>
                <button type="button" onClick={() => handleFinhesed()}>
                  Finalizar pedido
                </button>

                <Total>
                  <span>TOTAL</span>
                  <strong>{total}</strong>
                </Total>
              </footer>
            </>
          ) : (
            <AnimationContainer>
              <Animation animation={emptyAnimation} size={300} autoplay loop />
              <h2>Seu carrinho está vazio.</h2>
            </AnimationContainer>
          )}
        </>
      )}
    </Container>
  );
}
