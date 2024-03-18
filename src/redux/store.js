import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from 'redux-persist/es/storage/session'


const persistConfig = {
    key: 'main-root',
    storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware())

const persistor = persistStore(store)

export { persistor }

export default store;