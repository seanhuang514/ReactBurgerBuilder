import * as actionTypes from '../actions/actionTypes';

const initState = {
  orders: [],
  loading: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const new_order = {
        ...action.orderData,
        id: action.orderId
      };

      console.log('[PURCHASE_BURGER_SUCCESS]', new_order)

      return {
        ...state,
        orders: state.orders.concat(new_order),
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
