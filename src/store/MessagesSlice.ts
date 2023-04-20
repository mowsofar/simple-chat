import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IMessages {
    messages: {
        author: string,
        text: string,
        id: number,
        date: string
    }[];
}

const initialState: IMessages = {
    messages: [],
};

const MessagesSlice = createSlice({
    name: 'ms',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<IMessages>) {
            state.messages = action.payload.messages;
        },
    },
});

export const { setMessages } = MessagesSlice.actions;
export default MessagesSlice.reducer;
