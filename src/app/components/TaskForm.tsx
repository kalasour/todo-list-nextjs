import { Task, TaskType } from "@/models/Task";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import CustomCheckbox from "./CustomCheckbox";
import { fetchData } from "@/utils/fetchData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  appSelector,
  setLoading,
  setModalTask,
  triggerFetchTasks,
} from "@/store/slices/appSlice";

type Props = {};

export default function TaskForm({}: Props) {
  const formValidateSchema = Yup.object().shape({
    id: Yup.number().required("id is required"),
    type: Yup.mixed<TaskType>().required("Type is required"),
    name: Yup.string().required("Name is required").trim(),
    description: Yup.string().required("Description is required").trim(),
    isDone: Yup.boolean().required("Status is required"),
  });
  const currentTask = useAppSelector(appSelector).currentTask;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: currentTask,
    resolver: yupResolver(formValidateSchema),
  });
  const createTask = async (task: Task) => {
    const response = await fetchData({
      path: "/api/tasks",
      method: "POST",
      body: JSON.stringify(task),
    });

    return response;
  };
  const updateTask = async (task: Task) => {
    const response = await fetchData({
      path: "/api/tasks",
      method: "PUT",
      body: JSON.stringify(task),
    });

    return response;
  };
  const deleteTask = async (task: Task) => {
    const response = await fetchData({
      path: "/api/tasks",
      method: "DELETE",
      body: JSON.stringify(task),
    });

    return response;
  };
  const dispatch = useAppDispatch();
  const handleTaskSubmit = async (task: Task) => {
    dispatch(setLoading(true));
    if (currentTask.id == -1) await createTask(task);
    else await updateTask(task);
    dispatch(setLoading(false));
    dispatch(setModalTask(false));
    dispatch(triggerFetchTasks());
  };
  const handleDeleteTask = async (task: Task) => {
    dispatch(setLoading(true));
    await deleteTask(task);
    dispatch(setLoading(false));
    dispatch(setModalTask(false));
    dispatch(triggerFetchTasks());
  };
  const options = [
    { value: TaskType.High, name: "HIGH PRIORITY" },
    { value: TaskType.Normal, name: "NORMAL PRIORITY" },
  ];
  return (
    <div>
      <form
        onSubmit={handleSubmit((task) => {
          handleTaskSubmit(task);
        })}
      >
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <CustomSelect
              field={field}
              className="my-2"
              label="Type"
              value={TaskType.High}
              options={options}
              errorMsg={errors.type?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <CustomInput
              field={field}
              type="text"
              className="my-2"
              label="Name"
              placeholder="Please fill task name"
              errorMsg={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <CustomInput
              field={field}
              className="my-2"
              type="text"
              label="Description"
              placeholder="Please fill task description"
              errorMsg={errors.description?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="isDone"
          render={({ field: { onChange, value } }) => (
            <CustomCheckbox
              onChange={onChange}
              value={value}
              label="Is done task?"
              errorMsg={errors.isDone?.message}
            />
          )}
        />
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={() => handleDeleteTask(currentTask)}
            className="btn bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </button>
          <button
            type="submit"
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            {currentTask.id == -1 ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
