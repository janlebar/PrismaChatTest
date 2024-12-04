//db.ts
import { PrismaClient } from "@prisma/client";


declare global {
    var prisma: PrismaClient | undefined;
}
//basically so prisma can be used in the global scope if it is not already running
//because next.js hot reload does with prima... to many running for every hot reload
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;



