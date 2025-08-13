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

function Conversations({ id, title, categoryId, threadId,setConversationSelection }: ConversationsProps) {

  return (
      <div
        key={id}
        className={`py-0 ml-8 rounded rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-between`}
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

