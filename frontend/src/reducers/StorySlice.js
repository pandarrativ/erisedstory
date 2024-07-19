import { createSlice } from '@reduxjs/toolkit';


export const storySlice = createSlice({
  name: 'story',
  initialState: {
        scriptplay_id: undefined,
        learning_goal:undefined,
        personality_trait:undefined,
        personality_description:undefined, 
        is_writting: false,
        life_story:undefined,
        story_id:undefined,
        pages:0,
        current_task: "STORY",
        storyPlayData: [
          // {
          //   story: "Once upon a time in a small, sunny village, there lived a curious squirrel named Sammy. Sammy loved exploring the forest and discovering new adventures. One day, while searching for the biggest acorn, Sammy found a shiny, golden key hidden under a pile of colorful autumn leaves. Sammy wondered what the key might unlock and decided to embark on a journey to uncover its mystery. Along the way, Sammy met friendly animals who shared stories of a magical, hidden treehouse deep in the heart of the forest, known only to those with the golden key.",
          //   option1: "Sammy follows a glowing trail.",
          //   option2: "Sammy meets a talking owl.",
          //   option3: "Sammy discovers a hidden map.",
          //   selected_option: "",
          //   suggestion: "",
          //   feedback: "",
          // }
        ],     
  },
  reducers: {
    // initStoryPlay: (state, action) => {
    //   state.storyPlayData.push({
    //     story: "Once upon a time in a small, sunny village, there lived a curious squirrel named Sammy. Sammy loved exploring the forest and discovering new adventures. One day, while searching for the biggest acorn, Sammy found a shiny, golden key hidden under a pile of colorful autumn leaves. Sammy wondered what the key might unlock and decided to embark on a journey to uncover its mystery. Along the way, Sammy met friendly animals who shared stories of a magical, hidden treehouse deep in the heart of the forest, known only to those with the golden key.",
    //     option1: "Sammy follows a glowing trail.",
    //     option2: "Sammy meets a talking owl.",
    //     option3: "Sammy discovers a hidden map.",
    //     selected_option: "",
    //     suggestion: "",
    //     feedback: "",
    //   });
    //   state.current_task = "STORY";
    //   state.pages=1;

    // },
    addStoryPlayData: (state, action) => {
      state.storyPlayData.push({
        story: action.payload.story ,
        option1: action.payload.option1,
        option2: action.payload.option2,
        option3: action.payload.option3,
        selected_option: action.payload.selected_option,
        suggestion: action.payload.suggestion,
        feedback: action.payload.feedback,
      });
      state.pages += 1;
      state.current_task = action.payload.current_task;
    },
    setLearningGoal: (state, action) => {
      state.learning_goal = action.payload;
    },
    setSageTrait: (state, action) => {
      state.personality_trait = action.payload;
    },
    setTraitDescriptionAndLifeStory: (state, action) => {
      state.personality_description = action.payload.personality_description;
      state.life_story = action.payload.life_story;
    },
    setIsWritting: (state, action) => {
      state.is_writting = action.payload;
    },
    setCurrentTask: (state, action) => {
      state.current_task = action.payload;
    },
    updateStoryPlayData: (state, action) => {

      if(action.payload.option1) state.storyPlayData[state.storyPlayData.length - 1].option1 = action.payload.option1;
      if(action.payload.option2) state.storyPlayData[state.storyPlayData.length - 1].option2 = action.payload.option2;
      if(action.payload.option3) state.storyPlayData[state.storyPlayData.length - 1].option3 = action.payload.option3;
      
      if(action.payload.suggestion) state.storyPlayData[state.storyPlayData.length - 1].suggestion = action.payload.suggestion;
      if(action.payload.feedback) state.storyPlayData[state.storyPlayData.length - 1].feedback = action.payload.feedback;
   
      console.log(action.payload.selected_option);
      if(action.payload.selected_option) state.storyPlayData[state.storyPlayData.length - 1].selected_option = action.payload.selected_option;
      console.log(action.payload.selected_option);
    },
  },
});

export const storyActions = storySlice.actions;

export default storySlice.reducer;
