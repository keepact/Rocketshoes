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
        const { item } = action;

        draft.loading = state.loading.filter(id => id !== item.id);
      });
    default:
      return state;
  }
}
