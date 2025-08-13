// TypeScript interfaces
export interface Category {
	id: number;
	title: string;
	color: string;
	threads: Thread[];
}

export interface Thread {
	id: number;
	title: string;
	conversations: Conversation[];
}

export interface Conversation {
	id: number;
	title: string;
	messages: Message[];
}

export interface Message {
	role: string;
	content: string;
}