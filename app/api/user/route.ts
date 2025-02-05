// pages/api/create-user.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

//post useer

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch user data from Clerk
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract name and email
    const name = clerkUser.firstName || clerkUser.lastName || clerkUser.username;
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    // Create or update user in Prisma database
    const user = await prisma.user.upsert({
      where: { clerkUserId: userId },
      update: {
        name: name,
        email: email,
      },
      create: {
        clerkUserId: userId,
        email: email,
        name: name,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

//get

export async function GET(response: NextApiResponse) {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
