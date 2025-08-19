"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Conversation, Thread, Category} from "@/types/myTypes";
import { Conversations } from "../Conversations/Conversations";

interface threadsProps {
  id: number;
  title: string;
  color: string;
  categoryId: number;
  bgClassPale: string;
  conversations: Conversation[];
  setConversationSelection: Dispatch<SetStateAction<[number, number, number]>>;
  addThread: (categoryId: number, title: string) => void;
  addConversation: (categoryId: number, threadId: number, title: string) => void;
}


function Threads({ id, title, color, categoryId, conversations, bgClassPale, setConversationSelection, addThread, addConversation }: threadsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleThreads = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      <div
        key={id}
        className={`p-1 px-4 ml-4 rounded ${bgClassPale} text-gray-700 rounded-full hover:bg-gray-400 hover:text-white cursor-pointer flex items-center justify-between`}
		onClick={toggleThreads}
      >
        {title}
		<button
          onClick={(e) => {
			e.stopPropagation();  // ✅ prevents parent click
			addConversation(categoryId, id, "New Conversation");
		}}
          className={`hover:bg-gray-200 hover:text-black rounded-full py-0 ml-6 pl-2 pr-2`}
        >
          +
        </button>
      </div>
      {isOpen && (
		<div className="space-y-2 pt-2 flex-1 overflow-auto">
        {conversations.map((conv) => (
          <Conversations
            key={conv.id}
            id={conv.id}
            title={conv.title}
			categoryId={categoryId}
			threadId={id}
            setConversationSelection={setConversationSelection}
          />
        ))}
      </div>
	  )}
    </div>
  );
}

export { Threads }

