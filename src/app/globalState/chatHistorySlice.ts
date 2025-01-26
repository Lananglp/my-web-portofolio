import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface ChatMessage {
//   role: "user" | "model";
//   parts: { text: string }[];
// }

export interface ChatMessage {
  role: "user" | "data" | "system" | "assistant";
  content: string;
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
    addChatHistory: (state, action: PayloadAction<{ role: "user" | "data" | "system" | "assistant"; content: string }>) => {
      state.chat.push({
        role: action.payload.role,
        content: action.payload.content
      });
    },
    clearChatHistory: (state) => {
      state.chat = [];
    },
  },
});

export const { addChatHistory, clearChatHistory } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;