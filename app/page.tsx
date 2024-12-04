// pages.tsx

import * as React from "react";

import { getMessages } from "@/actions/chat";
import { MessageForm } from "@/app/MessageForm";





export default async function Chats() {

  const senderId = "user1-id"; // Replace with actual sender ID
  const receiverId = "user2-id"; // Replace with actual receiver ID
  const messages = await getMessages(senderId, receiverId);

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
              <li key={msg.id} className="my-2">
                <strong>{msg.sender?.name || "Unknown"}: </strong>
                {msg.content}
              </li>
            ))}
          </ul>
        )}
      </div>
      <MessageForm senderId={senderId} receiverId={receiverId} />
    </div>
  );
}
