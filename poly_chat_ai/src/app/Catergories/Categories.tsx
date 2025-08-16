"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Threads } from "../Threads/Threads";
import { Conversation, Thread, Category} from "@/types/myTypes";

const colorClassesBright: Record<string, string> = {
  yellow: "bg-yellow-300",
  blue: "bg-blue-300",
  red: "bg-red-300",
  green: "bg-green-300",
};

interface CategoriesProps {
  id: number;
  title: string;
  color: string;
  threads: Thread[];
  setConversationSelection: Dispatch<SetStateAction<[number, number, number]>>;
}

function Categories({ id, title, color, threads, setConversationSelection }: CategoriesProps) {

  const bgClass = colorClassesBright[color] || "bg-gray-300";
  const [isOpen, setIsOpen] = useState(true);
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
        className={`px-4 py-1 mb-1 rounded ${bgClass} font-bold rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-between`}
		onClick={toggleThreads}
      >
        {title}
        {/* <button
          onClick={() => handleNewthread()}
          className=" hover:bg-blue-600 font-bold rounded-full ml-4 px-2"
        >
          +
        </button> */}
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { Categories }
