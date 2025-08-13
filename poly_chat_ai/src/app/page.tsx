"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Categories } from "./Catergories/Categories";
import { Thread, Category, Message} from "@/types/myTypes";
import Input from "./Input/Input";


export default function Home() {
  const [categories, setCategories] = useState<Category[]>(getInitialCategories());

  const [conversationSelection, setConversationSelection] = useState<[number, number, number]>([
    categories[0].id,
    categories[0].threads[0].id,
    categories[0].threads[0].conversations[0].id,
  ]);

  const addMessage = (categoryId: number, threadId: number, conversationId: number, message: Message) => {
  setCategories((prev) =>
    prev.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            threads: cat.threads.map((thread) =>
              thread.id === threadId
                ? {
                    ...thread,
                    conversations: thread.conversations.map((conv) =>
                      conv.id === conversationId
                        ? { ...conv, messages: [...conv.messages, message] }
                        : conv
                    ),
                  }
                : thread
            ),
          }
        : cat
      )
    );
  };

  const [selectedCategoryId, selectedThreadId, selectedConversationId] = conversationSelection;

  const currentConversation = categories
  .find(cat => cat.id === selectedCategoryId)!
  .threads.find(thread => thread.id === selectedThreadId)!
  .conversations.find(conv => conv.id === selectedConversationId)!;

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
			  setConversationSelection={setConversationSelection}
            />
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-auto px-8 py-4 space-y-4">
          {currentConversation.messages.map((msg, index) => (
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
        <Input
          conversationSelection={conversationSelection}
          addMessage={addMessage}
        />
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