import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// API Route: /api/product/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const products = await prisma.product.findMany({
      where: {
        sellerId: id,
      },
    });

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "Products not found" }, { status: 404 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
