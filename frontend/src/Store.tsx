import React from "react";
import { Cart, CartItem } from "./type/Cart";

type AppState = {
  cart: Cart;
};

type StoreProviderProps = React.PropsWithChildren<{}>;
const initialState: AppState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "E Sewa",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action = { type: "ADD_TO_CART"; payload: CartItem };

function reducer(state: AppState, action: Action): AppState {
  let newItem, existItem, cartItems;
  switch (action.type) {
    case "ADD_TO_CART":
      newItem = action.payload;
      existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id,
      );
      cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item,
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    default:
      return state;
  }
}
const defaultDispatch: React.Dispatch<Action> = () => initialState;
const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});
function StoreProvider(props: StoreProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState,
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}
export { Store, StoreProvider };
