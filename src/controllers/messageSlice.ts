import { createSlice, CreateSliceOptions } from '@reduxjs/toolkit';

export interface MessageState {
  message: string;
  messageType: string;
  visibility: string;
}

const initialState: MessageState = {
  message: '',
  messageType: '',
  visibility: 'hide',
};

const messageSliceOptions: CreateSliceOptions<MessageState> = {
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMessageType: (state, action) => {
      state.messageType = action.payload;
    },
    setShowStatusBar: (state, action) => {
      state.visibility = action.payload;
    },
  },
};

const messageSlice = createSlice(messageSliceOptions);

export const { setMessage, setMessageType, setShowStatusBar } =
  messageSlice.actions;

export default messageSlice;
