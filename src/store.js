import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./components/view-projects/ProjectsSlice";

export default configureStore({
  reducer: {
    projectEditor: projectsReducer,
  },
});
