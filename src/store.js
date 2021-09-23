import { combineReducers, createStore } from "redux";
import commentWidgetReducer from "./reducer";
import data from "./config/data.json";

const getPersistedState = () => {
  const persistedState = localStorage.getItem("commentWidgetState");
  if (persistedState) return JSON.parse(persistedState);
  return { commentWidget: data };
};

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("commentWidgetState", serializedState);
};

const rootReducer = combineReducers({ commentWidget: commentWidgetReducer });

const store = createStore(rootReducer, getPersistedState());

store.subscribe(() => saveState(store.getState()));

export default store;
