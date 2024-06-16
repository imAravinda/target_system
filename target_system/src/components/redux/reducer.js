import { combineReducers } from "@reduxjs/toolkit";
import targetReducer from './target';
import dataReducer from './data';

const reducer = combineReducers({
    targetReducer: targetReducer,
    dataReducer:dataReducer
})

export default reducer;