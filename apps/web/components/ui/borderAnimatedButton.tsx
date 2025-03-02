import React from "react";

const BorderAnimatedButton = ({ children }: { children: any }) => {
  return (
    <div className="mx-auto flex  max-w-lg items-center justify-center">
      <div className="relative z-10 flex  cursor-pointer items-center overflow-hidden rounded-lg p-[2px]">
        <div className="animate-rotate absolute inset-0 h-full p-12 rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
        <div className="relative z-20 flex  rounded-[0.60rem] bg-primary-button">
          <span className="relative z-50 block rounded-lg border border-slate-800 bg-primary-button px-8 py-3 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-primary-button">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BorderAnimatedButton;
