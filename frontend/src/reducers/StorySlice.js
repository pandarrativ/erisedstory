import { compose, createSlice } from '@reduxjs/toolkit';


export const storySlice = createSlice({
  name: 'story',
  initialState: {
        scriptplay_id: undefined,
        learning_goal:undefined,
        personality_trait:undefined,
        story_id:undefined,
        pages:1,
        current_task: "STORY",
        storyPlayData: [
          {
            "story": "In a small, cozy village where everyone knew each other's names,there was a young boy named Alex who had a special pair of glasses that allowed him to see the world through the eyes of others. One sunny day, he stumbled upon a sad, lonely cat stuck in a tall tree, feeling scared and wishing for a friend to understand its fear.",
            "path_1": "",
            "path_2": "",
            "path_3": "",
            "path_selected": "",
          }
        ],     
  },
  reducers: {
    initStoryPlay: (state, action) => {
      state.storyPlayData.push({
        "story": "In a small, cozy village where everyone knew each other's names,there was a young boy named Alex who had a special pair of glasses that allowed him to see the world through the eyes of others. One sunny day, he stumbled upon a sad, lonely cat stuck in a tall tree, feeling scared and wishing for a friend to understand its fear.",
        "path_1": "",
        "path_2": "",
        "path_3": "",
        "path_selected": "",
      });
      state.current_task = "STORY";
      state.pages=1;

    //   state.scriptplay_id = action.payload.scriptplay_id;
    //   state.story =  action.payload.story;
    //   state.atagonist =  action.payload.atagonist;
    //   state.nextTask = action.payload.nextTask;
    //   state.pages = action.payload.pages;
    //   state.storyPlayData.push(action.payload.data);
    },
    addStoryPlayData: (state, action) => {
      state.storyPlayData.push({
        "story": action.payload.story,
        "path_1": "",
        "path_2": "",
        "path_3": "",
        "path_selected": "",
      });
      state.pages += 1;
    },
    setLearningGoal: (state, action) => {
      state.learning_goal = action.payload;
    },
    setSageTrait: (state, action) => {
      state.personality_trait = action.payload;
    },
    setCurrentTask: (state, action) => {
      state.current_task = action.payload;
    },
    updateStoryPlayData: (state, action) => {
      if(action.payload.path_1) state.storyPlayData[state.storyPlayData.length - 1].path_1 = action.payload.path_1;
      if(action.payload.path_2) state.storyPlayData[state.storyPlayData.length - 1].path_2 = action.payload.path_2;
      if(action.payload.path_3) state.storyPlayData[state.storyPlayData.length - 1].path_3 = action.payload.path_3;

      if(action.payload.path_selected) state.storyPlayData[state.storyPlayData.length - 1].path_selected = action.payload.path_selected;
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;
