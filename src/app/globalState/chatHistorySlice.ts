import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface ChatHistoryState {
  chat: ChatMessage[];
}

const initialState: ChatHistoryState = {
  chat: []
};

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    addChatHistory: (state, action: PayloadAction<{ role: "user" | "model"; parts: string }>) => {
      state.chat.push({
        role: action.payload.role,
        parts: [{ text: action.payload.parts }]
      });
    },
    clearChatHistory: (state) => {
      state.chat = [];
    },
  },
});

export const { addChatHistory, clearChatHistory } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;