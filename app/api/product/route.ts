import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadImageToCloudinary } from "@/lib/cloudinary"; // Import fungsi upload ke Cloudinary

const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const sellerId = formData.get("sellerId") as string;
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Upload ke Cloudinary dan dapatkan URL
    const imageUrl = await uploadImageToCloudinary(imageFile);

    // Simpan produk ke database Prisma
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl, // Simpan URL gambar Cloudinary
        sellerId,
        categoryId,
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
