import { configureStore } from "@reduxjs/toolkit";
import styleReducer from "./context/styleSlice";

const store = configureStore({
    reducer: {
        style: styleReducer,
    }
});

export default store;