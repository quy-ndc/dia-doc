import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentUser } from '../../assets/types/redux-type';


const initialState: CurrentUser = {
    id: null,
    name: null,
    avatar: null
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string | null>) => {
            state.id = action.payload
        },
        setName: (state, action: PayloadAction<string | null>) => {
            state.name = action.payload
        },
        setAvatar: (state, action: PayloadAction<string | null>) => {
            state.avatar = action.payload
        },
        clearUser: () => {
            return initialState;
        },
    },
});

export const { setId, setName, setAvatar, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;