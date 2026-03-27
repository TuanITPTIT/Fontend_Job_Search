import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { callFetchAllSkill } from '@/config/api';
import { type ISkill } from '@/types/backend';

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: ISkill[]
}
// API backend
// export const fetchSkill = createAsyncThunk(
//     'skill/fetchSkill',
//     async ({ query }: { query: string }) => {
//         const response = await callFetchAllSkill(query);
//         return response;
//     }
// )

// data fake
export const fetchSkill = createAsyncThunk(
    'skill/fetchSkill',
    async ({ query }: { query: string }) => {
        // Giả lập delay 500ms
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            data: {
                meta: {
                    page: 1,
                    pageSize: 10,
                    pages: 1,
                    total: 4
                },
                result: [
                    { id: "1", name: "React.JS", createdAt: new Date().toISOString() },
                    { id: "2", name: "Node.JS", createdAt: new Date().toISOString() },
                    { id: "3", name: "TypeScript", createdAt: new Date().toISOString() },
                    { id: "4", name: "Ant Design", createdAt: new Date().toISOString() }
                ]
            }
        };
    }
)
const initialState: IState = {
    isFetching: true,
    meta: {
        page: 1,
        pageSize: 10,
        pages: 0,
        total: 0
    },
    result: []
};


export const skillSlide = createSlice({
    name: 'skill',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },


    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchSkill.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchSkill.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchSkill.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.isFetching = false;
                state.meta = action.payload.data.meta;
                state.result = action.payload.data.result;
            }
            // Add user to the state array

            // state.courseOrder = action.payload;
        })
    },

});

export const {
    setActiveMenu,
} = skillSlide.actions;

export default skillSlide.reducer;
