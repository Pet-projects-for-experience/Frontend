import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContactState {
	email?: string;
	phone_number?: string;
	telegram_nick?: string;
	// Add other optional fields if needed
}

const initialState: ContactState = {};

const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		updateContact: (state, action: PayloadAction<Partial<ContactState>>) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateContact } = contactSlice.actions;
export default contactSlice.reducer;
