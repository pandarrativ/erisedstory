import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    items: {
        userId: "temp01",
    },
  },
  reducers: {
    initStoryPlay: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const storyActions = tasksSlice.actions;

export default storySlice.reducer;
