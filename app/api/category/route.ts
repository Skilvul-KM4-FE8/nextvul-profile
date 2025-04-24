import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create categories
export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  try {
    const category = await prisma.category.create({
      data: {
        name: name,
        description: description,
      },
    });

    return NextResponse.json({ status: "success", category });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Something error", { status: 501 });
  }
}

//get category
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
