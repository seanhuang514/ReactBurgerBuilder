import * as actionTypes from '../actions/actionTypes';

const initState = {
  orders: [],
  loading: false,
  purchased: false
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
        loading: false,
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};

export default reducer;
