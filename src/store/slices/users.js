import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateClient } from "aws-amplify/api";
import { listUsers } from "../../graphql/queries";

const initialState = {
  fetchAllUsersResponse: {
    isUserAdmin: false,
    userInfo: {
      email: "",
      id: "",
    },
    isLoading: false,
    response: {},
    error: null,
  },
};

// Thunk for adding a new user
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (userData, { rejectWithValue }) => {
    try {
      const client = generateClient();
      const users = await client.graphql({ query: listUsers });

      return users.data.listUsers.items;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Users slice
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeIsUserAdmin(state, action) {
      state.fetchAllUsersResponse.isUserAdmin = action.payload;
    },
    updateUserInfo(state, action) {
      console.log(
        "user infoooooooooooooooooooooooooooooooooooooooooooooooooooooo",
        action.payload
      );

      state.fetchAllUsersResponse.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.fetchAllUsersResponse.isLoading = true;
        state.fetchAllUsersResponse.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.fetchAllUsersResponse.response = action.payload;
        state.fetchAllUsersResponse.isLoading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.fetchAllUsersResponse.error = action.payload;
        state.fetchAllUsersResponse.isLoading = false;
      });
  },
});

export const { changeIsUserAdmin, updateUserInfo } = usersSlice.actions;

export default usersSlice.reducer;
