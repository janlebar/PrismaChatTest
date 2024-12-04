// pages.tsx

"use client";

import * as React from "react";
import { getMessages, deleteMessage } from "@/actions/chat";
import { MessageForm } from "@/app/MessageForm";

export default function Chats() {
  const senderId = "user1-id"; // Replace with actual sender ID
  const receiverId = "user2-id"; // Replace with actual receiver ID

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages(senderId, receiverId);
      setMessages(msgs);
    };
    fetchMessages();
  }, []);

  const handleDelete = async (messageId: number) => {
    await deleteMessage(messageId);
    setMessages(messages.filter((msg) => msg.id !== messageId)); // Remove message from state
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="chat-box bg-white p-4 shadow-md rounded">
        Profile: {senderId}
      </div>
      <div className="chat-box bg-white p-4 shadow-md rounded">
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          <ul>
            {messages.map((msg) => (
              <li key={msg.id} className="my-2 flex items-center">
                <div className="flex-1">
                  <strong>{msg.sender?.name || "Unknown"}: </strong>
                  {msg.content}
                </div>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <MessageForm senderId={senderId} receiverId={receiverId} />
    </div>
  );
}

