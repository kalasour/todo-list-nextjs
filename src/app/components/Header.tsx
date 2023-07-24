"use client";

import React from "react";
import Image from "next/image";
import CurrentDate from "./CurrentDate";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appSelector, setModalTask } from "@/store/slices/appSlice";

type Props = {};

export default function Header({}: Props) {
  const loggedIn = useAppSelector(appSelector).loggedIn;
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between items-end">
      <CurrentDate className="py-3" />
      {loggedIn && (
        <button onClick={() => dispatch(setModalTask(true))}>
          <div className="flex justify-center items-center gap-2 cursor-pointer p-2 hover:bg-slate-100 rounded-lg m-2 ease-in-out duration-300">
            <div
              className={`w-[24px] h-[24px] text-white rounded-full border-2 bg-pink-600 flex justify-center`}
            >
              <Image
                priority
                src="/plus.svg"
                height={12}
                width={12}
                alt="tick"
              />
            </div>
            <p className="font-bold text-sm">NEW TASK</p>
          </div>
        </button>
      )}
    </div>
  );
}
