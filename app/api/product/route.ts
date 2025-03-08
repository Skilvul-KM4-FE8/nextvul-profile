import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export interface Product {
  name: string;
  description?: string;
  price: number;
  seller: string;
  sellerId: string;
  categoryId?: string;
  category?: string;
}

export interface ProductResponse {
  status: string;
  product: Product;
}

//post product
export async function POST(req: NextRequest): Promise<NextResponse> {
  // const { name, description, price, sellerId, seller, categoryId, category } = await req.json();
  try {
    const product = await prisma.product.create({
      data: {
        name: "name",
        description: "description",
        price: 120000,
        imageUrl: "https://bs-uploads.toptal.io/blackfish-uploads/uploaded_file/file/191412/image-1582297511813-b188785eb990868e1e672230e8bbe740.png",
        sellerId: "cm6tkxjy500002hjk73dv3pm1",
        categoryId: "1",
      },
    });

    return NextResponse.json({ status: "success", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Something error" }, { status: 501 });
  }
}

//get product
export async function GET(res: NextApiResponse) {
  try {
    const product = await prisma.product.findMany();
    return new Response(JSON.stringify(product));
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
