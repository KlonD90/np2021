import { createStore, combineReducers, compose } from 'redux';
import districtsReducer from '../reducers/districts';

const configureStore = () => {
    const store = createStore(combineReducers({
        districts: districtsReducer
    }))

    return store
}

export default configureStore;