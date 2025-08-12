"use client";

import React, { useState } from "react";

function Conversations({id, titles}) {
		const [threads, setThreads] = useState([
		{ id: 1, title: "Thread 1" },
		{ id: 2, title: "Thread 2" },
	]);

	return (
		<div>

			<div
				key={id}
				className="ml-4 p-2 px-4 rounded bg-gray-300 {color} rounded-full hover:bg-gray-100 cursor-pointer"
				>
				{title} convo and more
				<button
						// onClick={() => handleNewConversation()}
						className="bg-gray-600 hover:bg-blue-600 text-white rounded-full ml-4 px-2"
					>
						+ 
				</button>
			</div>
			<div className="bg-gray-200 space-y-2 flex-1 overflow-auto">
					{threads.map((conv) => (
						<Conversations
							id={conv.id}
							tilte={conv.title}/>
						
					))}
				</div>
		</div>
	)
}

function Topic({id, title}) {
	const [conversations, setConversations] = useState([
	{ id: 1, title: "Conversation" },
	]);
	
	function handleNewConversation() {
		setConversations([
							...conversations,
							{ id: Date.now(), title: "New conversation" },
						])
	};

	return (
		<div>

			<div
				key={id}
				className="ml-4 p-2 px-4 rounded bg-gray-300 {color} rounded-full hover:bg-gray-100 cursor-pointer"
				>
				{title} topic and more
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
							id={conv.id}
							tilte={conv.title}/>
						
					))}
				</div>
		</div>
		
	)
}


function Sidebar({topics, setTopics}) {


	return (
		<div className="w-70 bg-gray-200 p-4 flex flex-col">
				{/* <h2 className="text-lg font-bold mb-4">Conversations</h2> */}
				<div className="bg-gray-200 space-y-2 flex-1 overflow-auto">
					{topics.map((top) => (
						<Topic
							id={top.id}
							tilte={top.title}/>
						
					))}
				</div>

			</div>
	)
}

export default function Home() {
	const [topics, setTopics] = useState([
		{ id: 1, title: "Topic" , conversations: {}},
		{ id: 2, title: "Topic" , conversations: {}},
	]);

	// TODO Hoow do y nest my states to heva a three strucure ?
	 const [messages, setMessages] = useState([
		{ role: "assistant", content: "Hello! How can I help you today?" },
	]);
	const [input, setInput] = useState("");

	const sendMessage = () => {
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
						onChange={(e) => setInput(e.target.value)}
						placeholder="Send a message..."
						className="flex-1 border rounded-full p-2 mr-2"
						onKeyDown={(e) => e.key === "Enter" && sendMessage()}
					/>
					<button
						onClick={sendMessage}
						className="bg-green-500 hover:bg-green-600 text-white rounded px-4"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
