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

//post

export async function POST(res: NextApiResponse) {
  try {
    const order = await prisma.order.create({
      data: {
        userId: "cm7cve1l50001jf2ctd16bddb",
        serviceType: "CODING_SERVICE",
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

    return new Response(JSON.stringify({ status: "success", order }), { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(501).json({ error: "Something error" });
  }
}
