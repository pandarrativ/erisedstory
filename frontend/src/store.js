import { configureStore } from '@reduxjs/toolkit';
import  userSettingsReducer from './reducers/userSettingsSlicer';
import  storyReducer  from './reducers/StorySlice';


export default configureStore({
  reducer: {
    userSettings: userSettingsReducer,
    story: storyReducer,
  }
})