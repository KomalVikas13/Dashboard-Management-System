import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "../slice/Slice";

const store = configureStore({
    reducer : SliceReducer
})

export default store