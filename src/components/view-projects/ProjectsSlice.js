import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
  name: "projectEditor",
  initialState: {
    projects: [],
    users: [],
  },
  reducers: {
    addProject: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    editProject: (state, action) => {
      let objIndex = state.projects.findIndex(
        (obj) => obj.id == action.payload.id
      );
      state.projects[objIndex] = action.payload;
    },
  },
});

export const { addProject, addUser, editProject } = projectsSlice.actions;

//selectors
export const selectProjects = (state) => state.projectEditor.projects;
export const selectUsers = (state) => state.projectEditor.users;

export default projectsSlice.reducer;
