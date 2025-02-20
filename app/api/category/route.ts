import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

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
export async function GET(res: NextApiResponse) {
  try {
    const users = await prisma.category.findMany();
    return new Response(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
