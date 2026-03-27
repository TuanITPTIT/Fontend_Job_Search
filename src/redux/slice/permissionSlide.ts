import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { callFetchPermission } from '@/config/api';
import { type IPermission } from '@/types/backend';

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IPermission[]
}
// Dung de goi API tu Backend
// export const fetchPermission = createAsyncThunk(
//     'permission/fetchPermission',
//     async ({ query }: { query: string }) => {
//         const response = await callFetchPermission(query);
//         return response;
//     }
// )

// DATA fake
export const fetchPermission = createAsyncThunk(
    'permission/fetchPermission',
    async ({ query }: { query: string }) => {
        // Giả lập delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            data: {
                meta: {
                    page: 1,
                    pageSize: 10,
                    pages: 1,
                    total: 3
                },
                result: [
                    { id: "1", name: "Lấy danh sách Jobs", apiPath: "/api/v1/jobs", method: "GET", module: "JOBS" },
                    { id: "2", name: "Tạo mới Job", apiPath: "/api/v1/jobs", method: "POST", module: "JOBS" },
                    { id: "3", name: "Xóa User", apiPath: "/api/v1/users/:id", method: "DELETE", module: "USERS" }
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


export const permissionSlide = createSlice({
    name: 'permission',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {


    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchPermission.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchPermission.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchPermission.fulfilled, (state, action) => {
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

} = permissionSlide.actions;

export default permissionSlide.reducer;
