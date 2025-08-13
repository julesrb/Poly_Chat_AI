"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { Conversation, Thread, Category} from "@/types/myTypes";

interface ConversationsProps {
  id: number;
  title: string;
}

function Conversations({ id, title, }: ConversationsProps) {

  return (
      <div
        key={id}
        className={`py-0 ml-8 rounded rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-between`}
      >
        {title}
    </div>
  );
}

export { Conversations }

