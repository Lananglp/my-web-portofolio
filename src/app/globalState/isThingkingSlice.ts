import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IsThingkingState {
  loading: boolean;
}

const initialState: IsThingkingState = {
  loading: false
};

const isThingkingSlice = createSlice({
  name: "isThingking",
  initialState,
  reducers: {
    setIsThingking: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { setIsThingking } = isThingkingSlice.actions;
export default isThingkingSlice.reducer;