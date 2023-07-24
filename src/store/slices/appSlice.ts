import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Task } from "@/models/Task";

type StateProp = {
  loggedIn: boolean;
  tasks: Task[];
  modalTask: boolean;
  loading: boolean;
};
const initialValue: StateProp = {
  loggedIn: false,
  tasks: [],
  modalTask: false,
  loading: false,
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
    setModalTask: (state, action) => {
      state.modalTask = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("access_token");
    },
  },
});

export const appSelector = (state: RootState) => state.appReducer;
export const { setTasks, logout, setModalTask, setLoading } = appSlice.actions;
export default appSlice.reducer;
