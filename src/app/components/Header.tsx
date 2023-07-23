"use client";

import React from "react";
import Image from "next/image";
import CurrentDate from "./CurrentDate";
import { useAppSelector } from "@/store/hooks";
import { appSelector } from "@/store/slices/appSlice";

type Props = {};

export default function Header({}: Props) {
  const accessToken = useAppSelector(appSelector).accessToken;

  return (
    <div className="flex justify-between items-end">
      <CurrentDate className="py-3" />
      {accessToken && (
        <div className="flex justify-center items-center gap-2 cursor-pointer p-3">
          <div
            className={`bg-white w-[24px] h-[24px] text-white rounded-full border-2 bg-pink-600 flex justify-center`}
          >
            <Image priority src="/plus.svg" height={12} width={12} alt="tick" />
          </div>
          <p className="font-bold text-sm">NEW TASK</p>
        </div>
      )}
    </div>
  );
}
