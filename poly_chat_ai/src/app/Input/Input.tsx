"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Categories } from "../Catergories/Categories";
import { Thread, Category, Message} from "@/types/myTypes";


interface InputProps {
  conversationSelection: [number, number, number];
  addMessage: (categoryId: number, threadId: number, conversationId: number, message: Message) => void;
}

export default function Input({ conversationSelection, addMessage }: InputProps) {
  const [input, setInput] = useState<string>("");

  const sendMessage = (
    e?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e) e.preventDefault?.();
    if (!input.trim()) return;

    // addMessage(categoryId, threadId, conversationId, { role: "user", content: input });
	addMessage(conversationSelection[0], conversationSelection[1], conversationSelection[2], { role: "user", content: input });
    setInput("");
  };

  return (
    <div className="px-8 py-4">
      <div className="p-2 bg-gray-300 rounded-xl flex">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            const maxHeight = 120;
            e.target.style.height = Math.min(e.target.scrollHeight, maxHeight) + "px";
          }}
          placeholder="Write anything..."
          className="flex-1 p-2 mr-2 resize-none overflow-y-auto 
                     scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent
                     focus:outline-none focus:ring-0"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e);
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-dark rounded-full px-3"
        >
          &#11014;
        </button>
      </div>
    </div>
  );
}

