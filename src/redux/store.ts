import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import currencyReducer from "./currency";

let reducers = combineReducers({
  currency: currencyReducer
});

export type RootState = ReturnType<typeof reducers>;

let store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export default store;
