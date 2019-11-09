export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
    loading: true,
  };
}

export function addToCartSuccess(item) {
  return {
    type: '@cart/ADD_SUCCESS',
    item,
    loading: false,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  };
}
