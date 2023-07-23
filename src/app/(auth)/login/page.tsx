"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/app/components/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};
interface User {
  username: string;
  password: string;
}
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

  return (
    <div>
      <form
        onSubmit={handleSubmit((value) => {
          alert(JSON.stringify(value));
          router.push("/");
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
