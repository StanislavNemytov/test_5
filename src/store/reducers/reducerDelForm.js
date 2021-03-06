import { serverRequests } from "../../api/apiServer";
import {
  CHANGE_INPUT,
  SAVE_DATA,
  GET_HISTORY,
} from "../actions/actionsDelFormTypes";

const initialState = {
  date: "",
  time: "",
  address: "",
  name: "",
  tel: "",
  ordersHistory: JSON.stringify([]),
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function reducerDelForm(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        [action.name]: action.value,
      };

    case SAVE_DATA:
      const newHistory = JSON.parse(state.ordersHistory);
      const newOrder = { ...state };
      delete newOrder.ordersHistory;
      newOrder.productsInOrder = action.productsInCart;
      newOrder.status = {
        payment: true,
        delivery: ["inProcess", "inStock", "delivered"][getRandomInt(3)],
      };

      newHistory.push(newOrder);

      serverRequests.addOrderToHistory(newHistory);

      return {
        ...initialState,
        ordersHistory: JSON.stringify(newHistory),
      };

    case GET_HISTORY:
      return { ...state, ordersHistory: action.history };

    default:
      return state;
  }
}
