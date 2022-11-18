import { createStore } from "redux";
import dataReucer from "./dataReducer/dataReducer";

const dataStore = createStore(dataReucer);

export default dataStore;