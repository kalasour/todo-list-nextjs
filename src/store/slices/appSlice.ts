import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Task, TaskType, defaultTask } from "@/models/Task";
import { boolean } from "yup";

type StateProp = {
  currentTask: Task;
  loggedIn: boolean;
  tasks: Task[];
  modalTask: boolean;
  loading: boolean;
  fetchTasksTrigger: boolean;
};
const initialValue: StateProp = {
  currentTask: defaultTask,
  loggedIn: false,
  tasks: [],
  modalTask: false,
  loading: false,
  fetchTasksTrigger: true,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialValue,
  reducers: {
    setTasks: (state, action) => {
      state.loggedIn = true;
      const newTasks = action.payload as Task[];
      state.tasks = newTasks.sort((a, b) => a.type - b.type);
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload as Task;
    },
    setModalTask: (state, action) => {
      state.modalTask = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    triggerFetchTasks: (state) => {
      state.fetchTasksTrigger = !state.fetchTasksTrigger;
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.loggedIn = false;
    },
  },
});

export const appSelector = (state: RootState) => state.appReducer;
export const {
  setTasks,
  logout,
  setModalTask,
  setLoading,
  setCurrentTask,
  triggerFetchTasks,
} = appSlice.actions;
export default appSlice.reducer;
