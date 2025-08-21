"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Conversation, Thread, Category} from "@/types/myTypes";
import { promises } from "dns";

interface ConversationsProps {
  conversation: Conversation
  categoryId: number;
  threadId: number;
  setConversationSelection: Dispatch<SetStateAction<[number, number, number]>>;
}

function Conversations({ conversation, categoryId, threadId, setConversationSelection}: ConversationsProps) {

	const findTitleName = async () => {
		if (conversation.messages.length < 7 && conversation.messages.length > 0) {
				const messagesCopy = [...conversation.messages];
        
				// Add the user prompt to the messages
				messagesCopy.push({
					role: 'user',
					content: "analyze the entire conversation so far and provide a concise summary of the overall topic in 26 characters or fewer and without dot in the end. After providing the answer, confirm that it does not exceed the limit.Do not include any explanations, code, or examples. Return 'New Chat' if the topic is too generic."
				});

				const res = await fetch("/api/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ messages: messagesCopy}),
				});
				if (!res.ok) {
					console.error("Server error:", await res.text());
					return;
				}
				const data = await res.json();
				console.log("new title:", data.reply.content);
				conversation.title = data.reply.content;
				return;
			}
	}

	if (conversation.title == "New Chat") {
		findTitleName();
	}

  return (
      <div
        key={conversation.id}
        className={`py-0 ml-6 pl-2 rounded text-sm rounded-full text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center justify-between`}
		onClick={() => {
			console.log("Category:", categoryId, "Thread:", threadId, "Conversation:", conversation.id);
			setConversationSelection([categoryId, threadId, conversation.id]);
		}}
      >
        {conversation.title}
    </div>
  );
}

export { Conversations }

