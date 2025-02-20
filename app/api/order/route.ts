import { prisma } from "@/lib/prisma";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(res: NextApiResponse) {
  try {
    const categories = await prisma.order.findMany();
    return new Response(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// model Order {
//  id          String    @id @default(cuid())
//  userId      String    // ID user dari Clerk
//  serviceType ServiceType
//  description String?
//  price       Float
//  status      OrderStatus @default(PENDING)
//  createdAt   DateTime  @default(now())
//  updatedAt   DateTime  @updatedAt
//  @@map("orders")
// }

export async function POST(res: NextApiResponse, req: NextRequest) {
  const { userId, serviceType, description, price, status } = await req.json();

  const userInfo = await currentUser();
  if (!userInfo) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log(userInfo.id);

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        serviceType,
        description,
        price,
        status,
      },
    });

    return res.json({ status: "success", order });
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response("Something error", { status: 501 });
  }
}
