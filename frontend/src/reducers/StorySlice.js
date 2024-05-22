import { createSlice } from '@reduxjs/toolkit';


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
            story: "Once upon a time in a small, sunny village, there lived a curious squirrel named Sammy. Sammy loved exploring the forest and discovering new adventures. One day, while searching for the biggest acorn, Sammy found a shiny, golden key hidden under a pile of colorful autumn leaves. Sammy wondered what the key might unlock and decided to embark on a journey to uncover its mystery. Along the way, Sammy met friendly animals who shared stories of a magical, hidden treehouse deep in the heart of the forest, known only to those with the golden key.",
            // "story":  `Sammy hopped along the forest path and suddenly, an owl hooted, "Hello there!" Sammy stopped and looked up. "Did you just talk?" asked Sammy. The owl nodded. "Yes, I'm Ollie, the talking owl. I know about the golden key. Follow me, and I'll show you the way!" Sammy smiled excitedly and followed Ollie. Along the way, they met a clever raccoon named Ricky and a wise turtle named Tilly. Together, they shared stories, helped each other, and learned new things on their adventure.`,
            path_1: "Sammy follows a glowing trail.",
            path_2: "Sammy meets a talking owl.",
            path_3: "Sammy discovers a hidden map.",
            suggestion: "",
            is_suggestion_accepted:"",
            path_selected: "",
          }
        ],     
  },
  reducers: {
    initStoryPlay: (state, action) => {
      state.storyPlayData.push({
        story: "Once upon a time in a small, sunny village, there lived a curious squirrel named Sammy. Sammy loved exploring the forest and discovering new adventures. One day, while searching for the biggest acorn, Sammy found a shiny, golden key hidden under a pile of colorful autumn leaves. Sammy wondered what the key might unlock and decided to embark on a journey to uncover its mystery. Along the way, Sammy met friendly animals who shared stories of a magical, hidden treehouse deep in the heart of the forest, known only to those with the golden key.",
        path_1: "Sammy follows a glowing trail.",
        path_2: "Sammy meets a talking owl.",
        path_3: "Sammy discovers a hidden map.",
        suggestion: "",
        is_suggestion_accepted:"",
        path_selected: "",
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
        story: action.payload.story ,
        path_1: action.payload.path_1,
        path_2: action.payload.path_2,
        path_3: action.payload.path_3,
        suggestion: action.payload.suggestion,
        is_suggestion_accepted: action.payload.is_suggestion_accepted,
        path_selected: action.payload.path_selected,
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
      
      if(action.payload.suggestion) state.storyPlayData[state.storyPlayData.length - 1].suggestion = action.payload.suggestion;
      if(action.payload.is_suggestion_accepted) state.storyPlayData[state.storyPlayData.length - 1].is_suggestion_accepted = action.payload.is_suggestion_accepted;

      if(action.payload.path_selected) state.storyPlayData[state.storyPlayData.length - 1].path_selected = action.payload.path_selected;
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;
