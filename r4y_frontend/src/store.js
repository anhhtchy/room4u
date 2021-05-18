import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loadState } from './localStorage';

import rootReducer from "./reducers";

// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default () => {
//     let store = createStore(persistedReducer);
//     let persistor = persistStore(store);
//     return { store, persistor }
// }

// const store = createStore(persistedReducer);

// export const persistor = persistor => persistStore(store);

// export default store;

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);
export default store;