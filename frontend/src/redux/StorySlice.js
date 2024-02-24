import { createSlice } from '@reduxjs/toolkit';


export const storySlice = createSlice({
  name: 'story',
  initialState: {
        storyPlayId: undefined,
        story:undefined,
        atagonist:undefined,
        nextTask: undefined,
        pages:undefined,
        storyPlayData: [],
        
  },
  reducers: {
    initStoryPlay: (state, action) => {
      state.storyPlayId = action.payload.storyPlayId;
      state.story =  action.payload.story;
      state.atagonist =  action.payload.atagonist;
      state.nextTask = action.payload.nextTask;
      state.pages = action.payload.pages;
      state.storyPlayData.push(action.payload.data);
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;
