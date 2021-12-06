import { configureStore } from '@reduxjs/toolkit'
import { mapReducer } from "./map.slice";

const store = configureStore({
    reducer: {
        map: mapReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;