import { compose, createSlice } from '@reduxjs/toolkit';


export const storySlice = createSlice({
  name: 'story',
  initialState: {
        scriptplay_id: undefined,
        learning_goal:undefined,
        personality_trait:undefined,
        story_id:undefined,
        pages:0,
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
    setLearningGoal: (state, action) => {
      state.learning_goal = action.payload;
    },
    setSageTrait: (state, action) => {
      state.personality_trait = action.payload;
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;
