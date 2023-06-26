import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";

  
  const initialState = {
    ads: [],
  };
  

  export const getUsersLikedAds = createAsyncThunk(
    "/getLiked",
    async (email) => {
      const {
        data: { ads },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      return ads;
    }
  );
  
  export const removeAdFromLiked = createAsyncThunk(
    "/deleteLiked",
    async ({ adId, email }) => {
      const {
        data: { ads },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        adId,
      });
      return ads;
    }
  );
  
  const EldeneleSlice = createSlice({
    name: "Eldenele",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getUsersLikedAds.fulfilled, (state, action) => {
        state.ads = action.payload;
      });
      builder.addCase(removeAdFromLiked.fulfilled, (state, action) => {
        state.ads = action.payload;
      });
    },
  });
  
  export const store = configureStore({
    reducer: {
      Eldenele: EldeneleSlice.reducer,
    },
  });
  
  export const { setAds } = EldeneleSlice.actions;