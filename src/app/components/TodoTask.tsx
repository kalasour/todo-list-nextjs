import React from "react";
import Image from "next/image";
import { Task, TaskType } from "@/models/Task";

type Props = {
  task: Task;
};

export default function TodoTask({ task }: Props) {
  let bgColor = "";
  let borderColor = "";
  let taskType = "";

  switch (TaskType[task.type].toString()) {
    case TaskType.High.toString():
      taskType = "HIGH PRIORITY";
      bgColor = "bg-orange-600";
      borderColor = "border-orange-800";
      break;
    case TaskType.Normal.toString():
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
  return (
    <div
      className={`${bgColor} p-3 text-white rounded-md flex items-center cursor-pointer drop-shadow-md hover:drop-shadow-2xl ease-in-out duration-300`}
    >
      <div className="grow">
        <p className="text-[0.65rem]">{taskType}</p>
        <p>{task.name}</p>
        <p className="text-[0.55rem]">{task.description}</p>
      </div>
      <div
        className={`bg-white w-[24px] h-[24px] rounded-full border-2 ${borderColor} flex justify-center`}
      >
        {task.isDone && (
          <Image priority src="/tick.svg" height={15} width={15} alt="tick" />
        )}
      </div>
    </div>
  );
}
