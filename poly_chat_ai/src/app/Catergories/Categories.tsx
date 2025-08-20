"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Threads } from "../Threads/Threads";
import { Conversation, Thread, Category} from "@/types/myTypes";


const colorClasses: Record<string, string> = {
  green: "bg-[#efff05]",
  blue: "bg-blue-300",
  red: "bg-red-300",
  yellow: "bg-[#FAE500]",
};

const colorClassesPale: Record<string, string> = {
  green: "bg-[#faffb8]",
  blue: "bg-blue-100",
  red: "bg-red-100",
  yellow: "bg-[#FFF9B8]",
  // add all your colors here
};

interface CategoriesProps {
  id: number;
  title: string;
  model: string;
  color: string;
  threads: Thread[];
  setConversationSelection: Dispatch<SetStateAction<[number, number, number]>>;
  addThread: (categoryId: number, title: string) => void;
  addConversation: (categoryId: number, threadId: number, title: string) => void;
}

function Categories({ id, title, model, color, threads, setConversationSelection, addThread, addConversation }: CategoriesProps) {

  const bgClass = colorClasses[color] || "bg-gray-300";
  const bgClassPale = colorClassesPale[color] || "bg-gray-300";
  const [isOpen, setIsOpen] = useState<boolean>(true);
  function handleNewthread() {
    // This function can be implemented to add new threads if needed
  }

  const toggleThreads = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        key={id}

        className={`px-4 py-1 mb-1 ${bgClass} rounded-full font-bold hover:text-white hover:bg-gray-500 cursor-pointer flex items-center justify-between`}
		onClick={toggleThreads}
      >
        <div className="flex items-center">
			{title} <span className="text-xs font-normal ml-2">{model}</span>
		</div>
		<button
          onClick={(e) => {
			e.stopPropagation();  // ✅ prevents parent click
			addThread(id, "New Thread");
		}}
          className={`hover:bg-gray-200 hover:bg-gray-400 hover:text-white rounded-full py-0 ml-4 pl-4 pr-4`}
        >
          +
        </button>
      </div>
      {isOpen && (
        <div className="space-y-2 flex-1 overflow-auto">
          {threads.map((thr) => (
            <Threads
              key={thr.id}
              id={thr.id}
              title={thr.title}
              color={color}
              conversations={thr.conversations}
              categoryId={id}
              setConversationSelection={setConversationSelection}
              addThread={addThread}
              addConversation={addConversation}
			  bgClassPale={bgClassPale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { Categories }
