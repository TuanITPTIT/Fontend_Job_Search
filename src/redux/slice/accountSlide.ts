import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { callFetchAccount } from '@/config/api';

// // Gọi API backend để lấy data
// export const fetchAccount = createAsyncThunk(
//     'account/fetchAccount',
//     async () => {
//         const response = await callFetchAccount();
//         return response.data;
//     }
// )

// Fake DATA
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async () => {
        // Giả lập delay 1 giây giống như chờ server phản hồi
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            user: {
                id: "TUAN-123",
                email: "tuan@example.com",
                name: "Tuan IT",
                role: {
                    id: "ROLE-ADMIN",
                    name: "ADMIN",
                    permissions: [
                        { id: "1", name: "Full Access", apiPath: "/api/v1/*", method: "GET", module: "ALL" }
                    ]
                }
            }
        };
    }
)
interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: {
            id?: string;
            name?: string;
            permissions?: {
                id: string;
                name: string;
                apiPath: string;
                method: string;
                module: string;
            }[]
        }
    };
    activeMenu: string;
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,// mặc định đang load để check account
    isRefreshToken: false,
    errorRefreshToken: "",
    user: {
        id: "",
        email: "",
        name: "",
        role: {
            id: "",
            name: "",
            permissions: [],
        },
    },

    activeMenu: 'home'
};


export const accountSlide = createSlice({
    name: 'account',
    initialState,
    reducers: {
        // sử dụng để khai báo nd action.payload
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        },
        setUserLoginInfo: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user.id = action?.payload?.id;
            state.user.email = action.payload.email;
            state.user.name = action.payload.name;
            state.user.role = action?.payload?.role;

            if (!action?.payload?.user?.role) state.user.role = {};
            state.user.role.permissions = action?.payload?.role?.permissions ?? [];
        },
        setLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                id: "",
                email: "",
                name: "",
                role: {
                    id: "",
                    name: "",
                    permissions: [],
                },
            }
        },
        setRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? "";
        }

    },
    extraReducers: (builder) => {
        //Thêm các reducer cho các loại hành động bổ sung tại đây và xử lý trạng thái tải khi cần thiết.
        builder.addCase(fetchAccount.pending, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })

        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user.id = action?.payload?.user?.id;
                state.user.email = action.payload.user?.email;
                state.user.name = action.payload.user?.name;
                state.user.role = action?.payload?.user?.role;
                if (!action?.payload?.user?.role) state.user.role = {};
                state.user.role.permissions = action?.payload?.user?.role?.permissions ?? [];
            }
        })

        builder.addCase(fetchAccount.rejected, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = false;
            }
        })

    },

});

export const {
    setActiveMenu, setUserLoginInfo, setLogoutAction, setRefreshTokenAction
} = accountSlide.actions;

export default accountSlide.reducer;
