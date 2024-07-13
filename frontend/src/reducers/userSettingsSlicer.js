import { createSlice } from '@reduxjs/toolkit';
import sage from "../assets/imgs/saga_agent.png";

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState: {
    username:"",
    uid:"",
    theme: "theme-1",
    sage: {sageName:"AI Mentor", sageImage:sage},
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