"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Categories } from "./Catergories/Categories";
import { ChatHistory } from "./ChatHistory/ChatHistory";
import { Thread, Conversation, Category, Message} from "@/types/myTypes";
import Input from "./Input/Input";

import ReactMarkdown from "react-markdown";


export default function Home() {
  const [categories, setCategories] = useState<Category[]>(getInitialCategories());

  const [conversationSelection, setConversationSelection] = useState<[number, number, number]>([
  categories[0].id,
  categories[0].threads[0].id,
  categories[0].threads[0].conversations[0].id,
  ]);

  const addConversation = (categoryId: number, threadId: number, title: string) => {
  setCategories((prev) =>
  prev.map((cat) =>
    cat.id === categoryId
    ? {
      ...cat,
      threads: cat.threads.map((thread) =>
        thread.id === threadId
        ? {
          ...thread,
          conversations: [
            ...thread.conversations,
            {
            id:
              (thread.conversations[thread.conversations.length - 1]?.id || 0) +
              1,
            title,
            messages: [],
            },
          ],
          }
        : thread
      ),
      }
    : cat
    )
  );
  };

  const addThread = (categoryId: number, title: string) => {
  setCategories((prev) =>
    prev.map((cat) =>
    cat.id === categoryId
      ? {
        ...cat,
        threads: [
        ...cat.threads,
        {
          id: (cat.threads[cat.threads.length - 1]?.id || 0) + 1,
          title,
          conversations: [],
        },
        ],
      }
      : cat
    )
  );
  };


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

  const deleteMessage = (categoryId: number, threadId: number, conversationId: number, messageIndex: number) => {
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
                        ? {
                            ...conv,
                            messages: conv.messages.filter((_, i) => i !== messageIndex),
                          }
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

  const currentConversation : Conversation = categories
  .find(cat => cat.id === selectedCategoryId)!
  .threads.find(thread => thread.id === selectedThreadId)!
  .conversations.find(conv => conv.id === selectedConversationId)!;

  return (
  <div className="flex h-screen bg-white text-gray-800">
    
    {/* Sidebar */}
    <div className="w-70 bg-[#f6f6f6] p-4 flex flex-col">
		<h2 className="text-lg font-bold mb-4 ">Poly_AI_Chat [-,-]</h2>
		<div className="space-y-2 flex-1 overflow-auto">
		{categories.map((top) => (
		<Categories
			key={top.id}
			id={top.id}
			model={top.model}
			title={top.title}
			color={top.color}
			threads={top.threads}
			setConversationSelection={setConversationSelection}
			addConversation={addConversation}
			addThread={addThread}
		/>
		))}
		</div>
    </div>

    <div className="flex flex-col flex-1">
    	{/* Chat history */}
		<ChatHistory
			currentConversation={currentConversation}
			conversationSelection={conversationSelection}
			deleteMessage={deleteMessage}
		/>
		<Input
			conversationSelection={conversationSelection}
			addMessage={addMessage}
			categories={categories}
		/>
	</div>
  </div>
  );
}

function getInitialCategories(): Category[] {
  return [
  {
  id: 1,
  title: "Programming",
  model: "gpt-4o",
  color: "blue",
  threads: [
   {
     id: 1,
     title: "Frontend project",
     conversations: [{ id: 1, title: "React with next.js", messages: []  }],
   },
   ],
  },
  {
  id: 2,
  title: "Cooking",
  model: "gemini",
  color: "red",
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
  id: 3,
  title: "Personal",
  model: "local",
  color: "yellow",
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