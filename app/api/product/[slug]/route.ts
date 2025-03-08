import { NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Sesuaikan dengan konfigurasi Prisma-mu

export async function GET(res: NextApiResponse) {
  try {
    const product = await prisma.product.findMany();
    return new Response(JSON.stringify(product));
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
