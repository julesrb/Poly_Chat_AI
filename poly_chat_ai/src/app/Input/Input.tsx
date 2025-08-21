"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Categories } from "../Catergories/Categories";
import { Thread, Category, Message} from "@/types/myTypes";


interface InputProps {
  conversationSelection: [number, number, number];
  addMessage: (categoryId: number, threadId: number, conversationId: number, message: Message) => void;
  categories: Category[];
}

export default function Input({ conversationSelection, addMessage, categories }: InputProps) {
  const [input, setInput] = useState<string>("");

const conversation =
   categories
     .find(cat => cat.id === conversationSelection[0])
     ?.threads.find(t => t.id === conversationSelection[1])
     ?.conversations.find(c => c.id === conversationSelection[2])
     ?.messages ?? [];

  const sendMessage = async (
	e?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
	if (e) e.preventDefault?.();
	if (!input.trim()) return;

	const [categoryId, threadId, conversationId] = conversationSelection;

	// show user message immediately
	addMessage(categoryId, threadId, conversationId, {
		role: "user",
		content: input,
	});
	setInput("");

	// ✅ send conversation + new user message as "messages"
	const res = await fetch("/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
		messages: [...conversation, { role: "user", content: input }],
		}),
	});

	if (!res.ok) {
		console.error("Server error:", await res.text());
		return;
	}

	const data = await res.json();

	// show assistant message
	addMessage(categoryId, threadId, conversationId, {
		role: "assistant", // 👈 was "system", should be "assistant"
		content: data.reply.content,
	});
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

