"use client";
import React from "react";

type Props = {
  modalOpen: boolean;
  title?: string;
  modalClose: Function;
};

export default function ModalBasic({
  modalOpen,
  title,
  children,
  modalClose,
}: Props & { children: React.ReactNode }) {
  return (
    <div>
      {modalOpen && (
        <div>
          <div className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50" />
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6">
            <div className="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
              <div className="px-5 py-3 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-slate-800">{title}</div>
                  <button
                    className="text-slate-400 hover:text-slate-500"
                    onClick={() => modalClose()}
                  >
                    <svg className="w-4 h-4 fill-current">
                      <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-5 py-3">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
