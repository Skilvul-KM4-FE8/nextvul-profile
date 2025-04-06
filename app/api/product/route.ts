import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadImageToCloudinary } from "@/lib/cloudinary"; // Import fungsi upload ke Cloudinary

const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const payload = await req.formData();
    console.log(payload);

    const product = await prisma.product.create({
      data: {
        name: payload.get("name") as string,
        description: payload.get("description") as string,
        price: parseFloat(payload.get("price") as string),
        imageUrl: payload.get("imageUrl") as string, // Ambil URL gambar dari form
        sellerId: payload.get("sellerId") as string,
        categoryId: payload.get("categoryId") as string,
      },
    });

    return NextResponse.json({ status: "success", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const product = await prisma.product.findMany();
    return new Response(JSON.stringify(product));
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
