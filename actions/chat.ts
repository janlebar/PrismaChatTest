//chat.ts
"use server"

import { db } from '@/lib/db';


export async function sendMessage(senderId: string, receiverId: string, content: string) {
    if (!senderId || !receiverId || !content) return null;

    const message = await db.message.create({
        data: {
            content,
            senderId,  // Using senderId instead of userId
            receiverId, // Adding receiverId for the receiver
        },
        include: { sender: true, receiver: true }, // Include sender and receiver details with the message
    });

    return message;
}

export async function deleteMessage(messageId: number) {
    if (!messageId) return null;

    const deletedMessage = await db.message.delete({
        where: { id: messageId },
    });

    return deletedMessage;
}

export async function getMessages(senderId: string, receiverId: string) {
    console.log("Sender ID HERE:", senderId);
    console.log("Receiver ID HERE:", receiverId);
    const messages = await db.message.findMany({
        where: {
            OR: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        },
        orderBy: { createdAt: 'asc' }, // Sort by createdAt for chat flow
        include: { sender: true }, // Include sender info for display
    });
    console.log("Messages:", messages);
    return messages;

}