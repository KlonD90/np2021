import { createStore, combineReducers, compose } from 'redux';
import districtsReducer from '../reducers/districts';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["districts"]
}

const rootReducer = combineReducers({
    districts: districtsReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export let store = createStore(persistedReducer)
export const persistor = persistStore(store)






