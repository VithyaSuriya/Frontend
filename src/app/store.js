import {  configureStore } from "@reduxjs/toolkit";
import { rootReducer } from ".";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";



const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tasks"],
  blacklist:[],
 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:false
    })
});

export const persistor=persistStore(store)
