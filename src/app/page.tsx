"use client";

import { Task, TaskType } from "@/models/Task";
import TodoTask from "./components/TodoTask";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  appSelector,
  setLoading,
  setModalTask,
  setTasks,
} from "@/store/slices/appSlice";
import { useEffect } from "react";
import { fetchData } from "@/utils/fetchData";
import ModalBasic from "./components/ModalBasic";
import TaskForm from "./components/TaskForm";

async function getData() {
  const response = await fetchData({
    path: "/api/tasks",
    method: "GET",
  });

  return response as Task[];
}

export default function Home() {
  const tasks: Task[] = useAppSelector(appSelector).tasks;
  const modalTask = useAppSelector(appSelector).modalTask;
  const currentTask = useAppSelector(appSelector).currentTask;
  const fetchTasksTrigger = useAppSelector(appSelector).fetchTasksTrigger;
  const dispatch = useAppDispatch();

  const getTask = async () => {
    dispatch(setLoading(true));
    const result = (await getData()).map((task) => {
      let newTask = task;
      newTask.type = TaskType[task.type.toString() as keyof typeof TaskType];
      return newTask;
    });
    dispatch(setTasks(result));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getTask();
  }, [fetchTasksTrigger]);

  const unCompleteTodoTask = tasks
    .filter((task) => !task.isDone)
    .map((task) => <TodoTask task={task} key={task.id}></TodoTask>);

  const completedTodoTask = tasks
    .filter((task) => task.isDone)
    .map((task) => <TodoTask task={task} key={task.id}></TodoTask>);

  return (
    <main className="flex min-h-[70dvh] flex-col items-center">
      <ModalBasic
        modalOpen={modalTask}
        title={currentTask.id == -1 ? "Create Task" : "Update Task"}
        modalClose={() => dispatch(setModalTask(false))}
      >
        <TaskForm></TaskForm>
      </ModalBasic>
      <div className="divide-y-2 divide-dashed flex flex-col w-full gap-8">
        <div>
          <p className="font-bold text-xl text-center my-6">TODO TASKS</p>
          <div className="flex flex-col w-full gap-3">{unCompleteTodoTask}</div>
        </div>
        <div>
          <p className="font-bold text-xl text-center my-6">DONE TASKS</p>
          <div className="flex flex-col w-full gap-3">{completedTodoTask}</div>
        </div>
      </div>
    </main>
  );
}
