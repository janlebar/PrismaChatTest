//MssageForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { sendMessage } from '../actions/chat';

interface MessageFormProps {
    senderId: string;
    receiverId: string;
}

export const MessageForm = ({ senderId, receiverId }: MessageFormProps) => {
    const [content, setContent] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!content.trim()) return;

        await sendMessage(senderId, receiverId, content);
        setContent('');  // Clear input field after sending
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex" >
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l"
                placeholder="Type your message..."
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r" >
                Send
            </button>
        </form>
    );
};
