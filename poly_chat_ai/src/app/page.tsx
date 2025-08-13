"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Categories } from "./Catergories/Categories";
import { Thread, Category, Message} from "@/types/myTypes";


export default function Home() {
  const [categories, setCategories] = useState<Category[]>(getInitialCategories());

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState<string>("");

  const sendMessage = (
    e?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e) e.preventDefault?.();
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-white text-gray-800">
      
      {/* Sidebar */}
      <div className="w-70 bg-[#f6f6f6] p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4 ">Categories</h2>
        <div className="space-y-2 flex-1 overflow-auto">
          {categories.map((top) => (
            <Categories
              key={top.id}
              id={top.id}
              title={top.title}
              color={top.color}
              threads={top.threads}
            />
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-auto px-8 py-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-lg whitespace-pre-wrap ${
                msg.role === "assistant"
                  ? "self-start"
                  : "bg-gray-300 self-end"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="px-8 py-4">
          <div className="p-2 bg-gray-300 rounded-xl flex">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);

              // Auto-grow but limit height
              e.target.style.height = "auto"; // reset height so scrollHeight is correct
              const maxHeight = 120; // px limit (around 5-6 lines)
              e.target.style.height = Math.min(e.target.scrollHeight, maxHeight) + "px";
            }}
            placeholder="Write anything..."
            className="flex-1 p-2 mr-2 resize-none overflow-y-auto 
                  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent
                  focus:outline-none focus:ring-0"
            rows={1}
            onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // stop newline
              sendMessage(e);
            }
            }}
          />
          <button
            onClick={(e) => sendMessage(e)}
            className="bg-green-500 hover:bg-green-600 text-dark rounded-full px-3"
          >
            &#11014;
          </button>
          </div>
          </div>
      </div>
    </div>
  );
}

function getInitialCategories(): Category[] {
  return [
  {
    id: 1,
    title: "Cooking",
    color: "yellow",
    threads: [
    {
      id: 1,
      title: "Homemade bread",
      conversations: [
      { id: 1, title: "Floor types", messages: [] },
      { id: 2, title: "Glucose molecule", messages: [] },
      ],
    },
    {
      id: 2,
      title: "Baked beans",
      conversations: [{ id: 1, title: "Types of beans", messages: [] }],
    },
    ],
  },
  {
    id: 2,
    title: "Development",
    color: "red",
    threads: [
    {
      id: 1,
      title: "Frontend project",
      conversations: [{ id: 1, title: "React with next.js", messages: []  }],
    },
    ],
  },
  {
    id: 3,
    title: "Personal",
    color: "blue",
    threads: [
    {
      id: 1,
      title: "Dog",
      conversations: [
      { id: 1, title: "Has my dog anxiety", messages: [] },
      { id: 2, title: "Dog training tips", messages: [] },
      ],
    },
    {
      id: 2,
      title: "Partner",
      conversations: [{ id: 1, title: "Car fight", messages: [] }],
    },
    ],
  },
  ];
}