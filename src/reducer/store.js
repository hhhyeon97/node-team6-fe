import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listReducer";

const store = configureStore({
    reducer: {
        list: listReducer
    },
});
export default store;