"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Conversation, Thread, Category} from "@/types/myTypes";

interface ConversationsProps {
  id: number;
  title: string;
  categoryId: number;
  threadId: number;
  setConversationSelection: Dispatch<SetStateAction<[number, number, number]>>;
}

function Conversations({ id, title, categoryId, threadId, setConversationSelection}: ConversationsProps) {

  return (
      <div
        key={id}
        className={`py-0 ml-6 pl-2 rounded rounded-full text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center justify-between`}
		onClick={() => {
			console.log("Category:", categoryId, "Thread:", threadId, "Conversation:", id);
			setConversationSelection([categoryId, threadId, id]);
		}}
      >
        {title}
    </div>
  );
}

export { Conversations }

