import React from "react";
import { Cart, CartItem, ShippingAddress } from "./type/Cart";
import { UserInfo } from "./type/UserInfo";

type AppState = {
  cart: Cart;
  userInfo?: UserInfo;
};

type StoreProviderProps = React.PropsWithChildren<{}>;
const initialState: AppState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
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

type Action =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: CartItem }
  | { type: "CART_CLEAR" }
  | { type: "USER_SIGNIN"; payload: UserInfo }
  | { type: "USER_SIGNOUT" }
  | { type: "SHIPPING_ADDRESS"; payload: ShippingAddress }
  | { type: "SAVE_PAYMENT_METHOD"; payload: string };

function reducer(state: AppState, action: Action): AppState {
  let newItem: CartItem;
  let existItem: CartItem | undefined;
  let cartItems: CartItem[] | undefined;
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
    case "REMOVE_FROM_CART":
      cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id,
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_CLEAR":
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      };
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        cart: {
          cartItems: [],
          paymentMethod: "E Sewa",
          shippingAddress: {
            fullName: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
          },
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      };
    case "SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
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
