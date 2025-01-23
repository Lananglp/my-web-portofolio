import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IsThingkingState {
  loading: boolean;
  isTyping: boolean;
  fullScreen: boolean;
}

const initialState: IsThingkingState = {
  loading: false,
  isTyping: false,
  fullScreen: false
};

const isThingkingSlice = createSlice({
  name: "isThingking",
  initialState,
  reducers: {
    setIsThingking: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },

    setIsTyping: (state, action: PayloadAction<{ isTyping: boolean }>) => {
      state.isTyping = action.payload.isTyping;
    },

    setFullScreen: (state, action: PayloadAction<{ fullScreen: boolean }>) => {
      state.fullScreen = action.payload.fullScreen;
    }
  },
});

export const { setIsThingking, setIsTyping, setFullScreen } = isThingkingSlice.actions;
export default isThingkingSlice.reducer;