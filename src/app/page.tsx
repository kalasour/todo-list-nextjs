"use client";

import { Task } from "@/models/Task";
import TodoTask from "./components/TodoTask";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appSelector, initTasks } from "@/store/slices/appSlice";
import { useEffect } from "react";

export default function Home() {
  const tasks: Task[] = useAppSelector(appSelector).tasks;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initTasks());
  }, []);

  const unCompleteTodoTask = tasks
    .filter((task) => !task.isDone)
    .map((task) => <TodoTask task={task} key={task.id}></TodoTask>);

  const completedTodoTask = tasks
    .filter((task) => task.isDone)
    .map((task) => <TodoTask task={task} key={task.id}></TodoTask>);

  return (
    <main className="flex min-h-[70dvh] flex-col items-center">
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
