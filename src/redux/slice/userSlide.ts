import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { callFetchUser } from '@/config/api';
import { type IUser } from '@/types/backend';

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IUser[]
}
// goi API tu backend
// export const fetchUser = createAsyncThunk(
//     'user/fetchUser',
//     async ({ query }: { query: string }) => {
//         const response = await callFetchUser(query);
//         return response;
//     }
// )

// DAta fake 
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async ({ query }: { query: string }) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            data: {
                meta: { page: 1, pageSize: 10, pages: 1, total: 2 },
                result: [
                    {
                        id: "1",
                        name: "Lê Quốc Tuấn",
                        email: "tuan@gmail.com",
                        role: { id: "1", name: "ADMIN" }, // Khớp với interface IUser bạn gửi ở trên
                        address: "Hà Nội",
                        age: 20,
                        gender: "MALE"
                    },
                    {
                        id: "2",
                        name: "Nguyễn Văn A",
                        email: "vana@gmail.com",
                        role: { id: "2", name: "USER" },
                        address: "Hồ Chí Minh",
                        age: 22,
                        gender: "MALE"
                    }
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


export const userSlide = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Thêm PayloadAction để hết báo lỗi gạch đỏ action
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },


    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchUser.fulfilled, (state, action) => {
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
} = userSlide.actions;

export default userSlide.reducer;
