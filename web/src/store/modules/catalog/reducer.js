import produce from 'immer';

const INITIAL_STATE = {
  loading: [],
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_REQUEST':
      return produce(state, draft => {
        const { id } = action;

        draft.loading.push(id);
      });
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.loading = state.loading.filter(id => id !== product.id);
      });
    default:
      return state;
  }
}
