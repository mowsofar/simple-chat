import { configureStore } from '@reduxjs/toolkit';
import MessagesReducer from "./MessagesSlice";

export const store = configureStore({
    reducer: {
        ms: MessagesReducer
    },
});


