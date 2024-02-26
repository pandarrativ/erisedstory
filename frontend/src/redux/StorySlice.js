import { createSlice } from '@reduxjs/toolkit';


export const storySlice = createSlice({
  name: 'story',
  initialState: {
        scriptplay_id: undefined,
        story:undefined,
        atagonist:undefined,
        nextTask: undefined,
        pages:undefined,
        storyPlayData: [],
        
  },
  reducers: {
    initStoryPlay: (state, action) => {
      state.scriptplay_id = action.payload.scriptplay_id;
      state.story =  action.payload.story;
      state.atagonist =  action.payload.atagonist;
      state.nextTask = action.payload.nextTask;
      state.pages = action.payload.pages;
      state.storyPlayData.push(action.payload.data);
    },
    addStoryPlayData: (state, action) => {
      state.storyPlayData.push(action.payload.data);
      state.pages += 1;
      state.nextTask = action.payload.nextTask;
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;
