"use client";

import { Conversation, Message } from "@/types/myTypes";
import { MarkdownRenderer } from "../MarkdownRenderer/MarkdownRenderer";

interface ChatHistoryProps {
  currentConversation: Conversation;
  conversationSelection: [number, number, number];
  deleteMessage: (categoryId: number, threadId: number, conversationId: number, messageIndex: number) => void;
}

function ChatHistory({ currentConversation, conversationSelection, deleteMessage }: ChatHistoryProps) {
  const [categoryId, threadId, conversationId] = conversationSelection;

  return (
    <div className="flex-1 overflow-auto px-8 py-4 space-y-4">
      {currentConversation.messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`relative p-3 pt-5 pr-5 rounded-xl whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-gray-300 mr-4 max-w-xs"
                : "bg-white ml-4"
            }`}
          >
            {/* Delete button (top-right) */}
            <button
              onClick={() => deleteMessage(categoryId, threadId, conversationId, index)}
              className="absolute top-1 right-1 text-gray-500 hover:text-red-500 text-sm"
            >
              X
            </button>

            <MarkdownRenderer content={msg.content} />
          </div>
        </div>
      ))}
    </div>
  );
}

export { ChatHistory };
