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
  confirmPassword: string;
}
const defaultUser: User = { username: "", password: "", confirmPassword: "" };
const formValidateSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").trim(),
  password: Yup.string().required("Password is required").trim(),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
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
          router.push("/login");
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
              className="my-2"
              type="password"
              label="Password"
              placeholder="Please fill password"
              errorMsg={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <CustomInput
              field={field}
              type="password"
              label="Re-type password"
              placeholder="Please confirm password"
              errorMsg={errors.confirmPassword?.message}
            />
          )}
        />
        <div className="flex items-center mt-6 gap-2">
          <button
            type="submit"
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Register
          </button>
          <div className="text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-500 hover:text-indigo-600"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
