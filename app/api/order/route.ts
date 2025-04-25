import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextApiResponse } from "next";

// model Order {
//  id          String    @id @default(cuid())
//  userId      String    // ID user dari Clerk
//  description String?
//  price       Float
//  status      OrderStatus @default(PENDING)
//  createdAt   DateTime  @default(now())
//  updatedAt   DateTime  @updatedAt
//  @@map("orders")
// }

// GET handler
export async function GET(request: Request) {
  try {
    const categories = await prisma.order.findMany();
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

// POST handler
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
    });
  }

  const userId = user.id;

  try {
    // const body = await request.json(); // Uncomment if parsing body is needed
    const order = await prisma.order.create({
      data: {
        userId: userId,
        description: "description test",
        price: 120000,
        orderItems: {
          create: [
            {
              productId: "cm7cve1l50001jf2ctd16bdbm",
              quantity: 2,
            },
            {
              productId: "cm7cvf0p30003jf2cvyslbj4s",
              quantity: 4,
            },
          ],
        },
      },
      include: {
        orderItems: true,
      },
    });

    return new Response(JSON.stringify({ status: "success", order }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(JSON.stringify({ error: "Something error" }), {
      status: 500,
    });
  }
}
