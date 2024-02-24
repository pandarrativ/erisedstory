import { createSlice } from '@reduxjs/toolkit';


export const storySlice = createSlice({
  name: 'story',
  initialState: {
    items: {
        storyPlayId: undefined,
        storyPlayData: [],
    },
  },
  reducers: {
    initStoryPlay: (state, action) => {
      state.storyPlayId = action.payload.storyPlayId,
      statePlayData.push(action.payload.data);
    },
  },
});

export const storyActions = tasksSlice.actions;

export default storySlice.reducer;
