import { configureStore } from '@reduxjs/toolkit';
import { storySlice } from './StorySlice';
import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    "user":userSlice.reducer,
    "story":storySlice.reducer,
  },
});
