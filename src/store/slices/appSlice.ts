import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Task, TaskType } from "@/models/Task";

type StateProp = {
  accessToken: string;
  tasks: Task[]
};
const initialValue: StateProp = { accessToken: "", tasks: [] };

const appSlice = createSlice({
  name: "app",
  initialState: initialValue,
  reducers: {
    initTasks: (state) => {
        state.tasks = [
            {
              id: 0,
              type: TaskType.High,
              name: "Buy Presents",
              description: "Go and buy items from market.",
              isDone: false,
            },
            {
              id: 1,
              type: TaskType.High,
              name: "Go To The Store",
              description: "Go to the store.",
              isDone: false,
            },
            {
              id: 2,
              type: TaskType.Normal,
              name: "Go For A Walk",
              description: "Walk a minimum 3km today.",
              isDone: false,
            },
            {
              id: 3,
              type: TaskType.High,
              name: "Call James",
              description: "Call James for a meeting update.",
              isDone: true,
            },
          ].sort((a, b) => a.type - b.type);          
      },
  },
});

export const appSelector = (state: RootState) => state.appReducer;
export const { initTasks } = appSlice.actions;
export default appSlice.reducer;