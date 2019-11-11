import { combineReducers } from 'redux';

import cart from './cart/reducer';
import catalog from './catalog/reducer';

export default combineReducers({
  cart,
  catalog,
});
