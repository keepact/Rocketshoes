import { Alert } from 'react-native';
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import NavigationService from '../../../services/navigation';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert(
      'Quantidade solicitada fora de estoque',
      'Não fique desmotivado, procure outro tênis do seu gosto.',
      [
        {
          text: 'OK',
        },
      ]
    );
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));

    // yield call(AsyncStorage.setItem, '@Rocketshoes:cart', valor);

    NavigationService.navigate('Cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert(
      'Quantidade solicitada fora de estoque',
      'Não fique desmotivado, procure outro tênis do seu gosto.',
      [
        {
          text: 'OK',
        },
      ]
    );
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

// function* initSaga() {
//   // pegar os dados do teu storage do carrinho
//   // repassar pro reducer

//   yield put(cartLoadedSuccess(cart));
// }

export default all([
  // initSaga,
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
