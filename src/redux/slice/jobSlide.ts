import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { callFetchJob } from '@/config/api';
import { type IJob } from '@/types/backend';// phai co type k no bao do

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IJob[]
}
// Goi API tu backend
// export const fetchJob = createAsyncThunk(
//     'job/fetchJob',
//     async ({ query }: { query: string }) => {
//         const response = await callFetchJob(query);
//         return response;
//     }
// )

// Data fake
export const fetchJob = createAsyncThunk(
    'job/fetchJob',
    async ({ query }: { query: string }) => {
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
                        id: "1",
                        name: "Frontend Developer (ReactJS)",
                        // Sửa lại skills thành mảng Object cho đúng ISkill[]
                        skills: [
                            { id: "s1", name: "React" },
                            { id: "s2", name: "TypeScript" }
                        ],
                        location: "Hà Nội",
                        salary: 1500,
                        quantity: 5,
                        level: "INTERN",
                        description: "Làm việc với ReactJS",
                        startDate: new Date(),
                        endDate: new Date(),
                        active: true,
                        company: { 
                            id: "c1", 
                            name: "FPT Software", 
                            logo: "fpt-logo.png" 
                        },
                        updatedAt: new Date().toISOString()
                    },
                    {
                        id: "2",
                        name: "Backend Developer (NodeJS)",
                        skills: [
                            { id: "s3", name: "NodeJS" },
                            { id: "s4", name: "MongoDB" }
                        ],
                        location: "Hồ Chí Minh",
                        salary: 2000,
                        quantity: 3,
                        level: "FRESHER",
                        description: "Làm việc với NodeJS",
                        startDate: new Date(),
                        endDate: new Date(),
                        active: true,
                        company: { 
                            id: "c2", 
                            name: "Viettel IT", 
                            logo: "viettel-logo.png" 
                        },
                        updatedAt: new Date().toISOString()
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


export const jobSlide = createSlice({
    name: 'job',
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
        builder.addCase(fetchJob.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchJob.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchJob.fulfilled, (state, action) => {
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
} = jobSlide.actions;

export default jobSlide.reducer;
