"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/app/components/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import { useAppDispatch } from "@/store/hooks";
import { setLoading } from "@/store/slices/appSlice";

type Props = {};
const defaultUser: User = { username: "", password: "" };
const formValidateSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").trim(),
  password: Yup.string().required("Password is required").trim(),
});

export default function HookFormPage({}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: defaultUser,
    resolver: yupResolver(formValidateSchema),
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (user: User) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorCode = response.status;
        throw new Error(
          `Request failed with status ${errorCode}: ${JSON.stringify(
            errorData
          )}`
        );
      }
      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem("access_token", data.token);
        dispatch(setLoading(false));
        router.push("/");
        return;
      }
      dispatch(setLoading(false));
      return data;
    } catch (error: any) {
      console.error("Error occurred:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((user) => {
          login(user);
        })}
      >
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <CustomInput
              field={field}
              type="text"
              className="my-2"
              label="Username"
              placeholder="Please fill username"
              errorMsg={errors.username?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <CustomInput
              field={field}
              type="password"
              label="Password"
              placeholder="Please fill password"
              errorMsg={errors.password?.message}
            />
          )}
        />
        <div className="flex items-center mt-6 gap-2">
          <button
            type="submit"
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Login
          </button>
          <div className="text-sm">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-500 hover:text-indigo-600"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
