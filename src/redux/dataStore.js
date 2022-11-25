import { configureStore } from "@reduxjs/toolkit";
import dataReucer from "./dataReducer/dataReducer";

const dataStore = configureStore({
    reducer : dataReucer
})

export default dataStore;