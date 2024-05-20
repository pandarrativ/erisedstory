import { createSlice } from '@reduxjs/toolkit';
import pd1 from "../assets/temp/pd1.jpg";

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState: {
    username:"",
    uid:"",
    theme: "theme-1",
    sage: {sageName:"Panda 1", sageImage:pd1},
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.username = action.payload.username;
      state.uid = action.payload._id;
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    setSage: (state, action) => {
      state.sage = {sageName:action.payload.sageName, sageImage: action.payload.sageImage };
    }
  }
})


export const  userSettingsActions = userSettingsSlice.actions;

export default userSettingsSlice.reducer