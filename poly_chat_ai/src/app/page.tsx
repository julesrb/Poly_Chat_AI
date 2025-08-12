"use client";

import React, { useState, Dispatch, SetStateAction, ChangeEvent, KeyboardEvent, MouseEvent } from "react";

// TypeScript interfaces
export interface Thread {
	id: number;
	title: string;
}

export interface Conversation {
	id: number;
	title: string;
	threads: Thread[];
}

export interface Topic {
	id: number;
	title: string;
	conversations: Conversation[];
}

interface ConversationsProps {
	id: number;
	title: string;
	threads: Thread[];
}

function Conversations({ id, title, threads }: ConversationsProps) {
	return (
		<div>
			<div
				key={id}
				className="ml-4 p-2 px-4 rounded bg-gray-300 {color} rounded-full hover:bg-gray-100 cursor-pointer"
			>
				{title}
				<button
					// onClick={() => handleNewConversation()}
					className="bg-gray-600 hover:bg-blue-600 text-white rounded-full ml-4 px-2"
				>
					+
				</button>
			</div>
			<div className="bg-gray-200 space-y-2 flex-1 overflow-auto">
				{threads.map((thread) => (
					<div key={thread.id} className="ml-6 p-1">
						{thread.title}
					</div>
				))}
			</div>
		</div>
	);
}

interface TopicProps {
	id: number;
	title: string;
	conversations: Conversation[];
}

function Topic({ id, title, conversations }: TopicProps) {
	function handleNewConversation() {
		// This function can be implemented to add new conversations if needed
	}

	return (
		<div>
			<div
				key={id}
				className="ml-4 p-2 px-4 rounded bg-gray-300 {color} rounded-full hover:bg-gray-100 cursor-pointer"
			>
				{title}
				<button
					onClick={() => handleNewConversation()}
					className="bg-gray-600 hover:bg-blue-600 text-white rounded-full ml-4 px-2"
				>
					+
				</button>
			</div>
			<div className="bg-gray-200 space-y-2 flex-1 overflow-auto">
				{conversations.map((conv) => (
					<Conversations
						key={conv.id}
						id={conv.id}
						title={conv.title}
						threads={conv.threads}
					/>
				))}
			</div>
		</div>
	);
}

interface SidebarProps {
	topics: Topic[];
	setTopics: Dispatch<SetStateAction<Topic[]>>;
}

function Sidebar({ topics, setTopics }: SidebarProps) {
	return (
		<div className="w-70 bg-gray-200 p-4 flex flex-col">
			{/* <h2 className="text-lg font-bold mb-4">Conversations</h2> */}
			<div className="bg-gray-200 space-y-2 flex-1 overflow-auto">
				{topics.map((top) => (
					<Topic
						key={top.id}
						id={top.id}
						title={top.title}
						conversations={top.conversations}
					/>
				))}
			</div>
		</div>
	);
}

interface Message {
	role: string;
	content: string;
}

export default function Home() {
	const [topics, setTopics] = useState<Topic[]>([
		{
			id: 1,
			title: "Topic 1",
			conversations: [
				{
					id: 1,
					title: "Conversation 1",
					threads: [
						{ id: 1, title: "Thread 1" },
						{ id: 2, title: "Thread 2" },
					],
				},
				{
					id: 2,
					title: "Conversation 2",
					threads: [{ id: 3, title: "Thread 3" }],
				},
			],
		},
		{
			id: 2,
			title: "Topic 2",
			conversations: [
				{
					id: 3,
					title: "Conversation 3",
					threads: [{ id: 4, title: "Thread 4" }],
				},
			],
		},
	]);

	// TODO Hoow do y nest my states to heva a three strucure ?
	const [messages, setMessages] = useState<Message[]>([
		{ role: "assistant", content: "Hello! How can I help you today?" },
	]);
	const [input, setInput] = useState<string>("");

	const sendMessage = (
		e?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
	) => {
		if (e) e.preventDefault?.();
		if (!input.trim()) return;
		setMessages([...messages, { role: "user", content: input }]);
		setInput("");
	};

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<Sidebar
				// conversations={conversations}
				// setConversations={setConversations}
				topics={topics}
				setTopics={setTopics}
				// threads={threads}
				// setTthreads={setThreads}
			/>

			{/* Chat Thread */}
			<div className="flex flex-col flex-1">
				<div className="flex-1 overflow-auto px-8 py-4 space-y-4">
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`p-3 rounded-lg max-w-lg whitespace-pre-wrap ${
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
				<div className="px-8 py-4 bg-white border-t flex">
					<input
						type="text"
						value={input}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
						placeholder="Send a message..."
						className="flex-1 border rounded-full p-2 mr-2"
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage(e)}
					/>
					<button
						onClick={(e) => sendMessage(e)}
						className="bg-green-500 hover:bg-green-600 text-white rounded px-4"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
