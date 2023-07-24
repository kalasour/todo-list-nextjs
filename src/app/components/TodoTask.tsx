import React from "react";
import Image from "next/image";
import { Task, TaskType } from "@/models/Task";
import { useAppDispatch } from "@/store/hooks";
import {
  setCurrentTask,
  setLoading,
  setModalTask,
  triggerFetchTasks,
} from "@/store/slices/appSlice";
import { fetchData } from "@/utils/fetchData";

type Props = {
  task: Task;
};

export default function TodoTask({ task }: Props) {
  let bgColor = "";
  let borderColor = "";
  let taskType = "";
  const dispatch = useAppDispatch();
  switch (task.type) {
    case TaskType.High:
      taskType = "HIGH PRIORITY";
      bgColor = "bg-orange-600";
      borderColor = "border-orange-800";
      break;
    case TaskType.Normal:
      taskType = "NORMAL PRIORITY";
      bgColor = "bg-sky-600";
      borderColor = "border-sky-800";
      break;
  }

  if (task.isDone) {
    taskType = "DONE";
    bgColor = "bg-green-600";
    borderColor = "border-green-800";
  }

  const updateTask = async (task: Task) => {
    const response = await fetchData({
      path: "/api/tasks",
      method: "PUT",
      body: JSON.stringify(task),
    });

    return response;
  };

  const triggerTask = async () => {
    dispatch(setLoading(true));
    await updateTask({ ...task, isDone: !task.isDone });
    dispatch(setLoading(false));
    dispatch(setModalTask(false));
    dispatch(triggerFetchTasks());
  };

  return (
    <button
      onClick={() => {
        dispatch(setCurrentTask(task));
        dispatch(setModalTask(true));
      }}
      className={`${bgColor} p-3 text-white rounded-md flex items-center drop-shadow-md hover:drop-shadow-2xl ease-in-out duration-300`}
    >
      <div className="grow flex flex-col items-start">
        <p className="text-[0.65rem]">{taskType}</p>
        <p className="font-bold">{task.name}</p>
        <p className="text-[0.55rem]">{task.description}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          triggerTask();
        }}
        className={`bg-white w-[24px] h-[24px] rounded-full border-2 ${borderColor} flex justify-center items-center`}
      >
        {task.isDone && (
          <Image priority src="/tick.svg" height={15} width={15} alt="tick" />
        )}
      </button>
    </button>
  );
}
