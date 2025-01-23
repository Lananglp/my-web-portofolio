import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from "./globalState/chatHistorySlice";
import isThingkingSlice from "./globalState/stateForAiSlice";

export const redux = configureStore({
  reducer: {
    chatHistory: chatHistoryReducer,
    isThingking: isThingkingSlice
  },
});
  
export type RootState = ReturnType<typeof redux.getState>;
export type AppDispatch = typeof redux.dispatch;