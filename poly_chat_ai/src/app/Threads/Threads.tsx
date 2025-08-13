"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Conversation, Thread, Category} from "@/types/myTypes";
import { Conversations } from "../Conversations/Conversations";

interface threadsProps {
  id: number;
  title: string;
  color: string;
  conversations: Conversation[];
}

const colorClassesPale: Record<string, string> = {
  yellow: "bg-yellow-100",
  blue: "bg-blue-100",
  red: "bg-red-100",
  green: "bg-green-100",
  // add all your colors here
};

function Threads({ id, title, color, conversations }: threadsProps) {
  const bgClass = colorClassesPale[color] || "bg-gray-300";

  return (
    <div>
      <div
        key={id}
        className={`p-1 px-4 ml-4 rounded ${bgClass} rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-between`}
      >
        {title}
        <button
          // onClick={() => handleNewthread()}
          className="hover:bg-blue-600 rounded-full ml-4 px-2"
        >
          +
        </button>
      </div>
      <div className="space-y-2 pt-2 flex-1 overflow-auto">
        {conversations.map((conv) => (
          <Conversations
            key={conv.id}
            id={conv.id}
            title={conv.title}
          />
        ))}
      </div>
    </div>
  );
}

export { Threads }

