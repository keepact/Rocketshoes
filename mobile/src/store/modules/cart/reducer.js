import produce from 'immer';

const cartDefaultState = [];

export default function cart(state = cartDefaultState, action) {
  switch (action.type) {
    case '@cart/RESET':
      return cartDefaultState;
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { item } = action;
        const productIndex = draft.findIndex(p => p.id === item.id);

        if (productIndex >= 0) {
          draft[productIndex].loading = false;
        }

        draft.push(item);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
