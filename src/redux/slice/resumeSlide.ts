import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { callFetchJob, callFetchResume } from '@/config/api';
import { type IResume } from '@/types/backend';

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IResume[]
}
// Goi API tu backend
// export const fetchResume = createAsyncThunk(
//     'resume/fetchResume',
//     async ({ query }: { query: string }) => {
//         const response = await callFetchResume(query);
//         return response;
//     }
// )

// Data fake
export const fetchResume = createAsyncThunk(
    'resume/fetchResume',
    async ({ query }: { query: string }) => {
        // Giả lập delay 500ms
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            data: {
                meta: {
                    page: 1,
                    pageSize: 10,
                    pages: 1,
                    total: 2
                },
                result: [
                    {
                        id: "RS-001",
                        email: "tuan@gmail.com",
                        userId: "U-001",
                        url: "my-cv-frontend.pdf",
                        status: "PENDING",
                        companyId: { id: "C-01", name: "FPT Software", logo: "fpt.png" },
                        jobId: { id: "J-01", name: "Frontend Developer (React)" },
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: "RS-002",
                        email: "tuan@gmail.com",
                        userId: "U-001",
                        url: "my-cv-react.pdf",
                        status: "APPROVED",
                        companyId: { id: "C-02", name: "Viettel", logo: "viettel.png" },
                        jobId: { id: "J-02", name: "Senior ReactJS" },
                        createdAt: new Date().toISOString()
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


export const resumeSlide = createSlice({
    name: 'resume',
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
        builder.addCase(fetchResume.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchResume.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchResume.fulfilled, (state, action) => {
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
} = resumeSlide.actions;

export default resumeSlide.reducer;
