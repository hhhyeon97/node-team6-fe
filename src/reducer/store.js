import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./likeReducer";

const store = configureStore({
    reducer: {
        like:likeReducer
    }
})

export default store;