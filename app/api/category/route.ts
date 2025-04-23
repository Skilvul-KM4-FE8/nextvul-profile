import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//post user
// export async function POST(req: NextRequest) {
//   const { clerkUserId, email, name } = await req.json();
//   try {
//     const user = await prisma.user.create({
//       data: {
//         clerkUserId: clerkUserId,
//         email: email,
//         name: name,
//       },
//     });

//     return NextResponse.json({ status: "success", clerkUserId, email, name, user });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return new Response("Something error", { status: 501 });
//   }
// }

//get user
// export async function GET(req: NextRequest) {
//   try {
//     const users = await prisma.category.findMany();
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
