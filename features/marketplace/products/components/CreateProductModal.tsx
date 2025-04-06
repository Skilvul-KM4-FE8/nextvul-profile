"use client";

import { useState } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary"; // Adjust path
import { toast } from "sonner"; // Optional toast
import { useUser } from "@clerk/nextjs"; // Import Clerk
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useModalStore from "@/store/useModalStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PriceInput } from "@/components/molecules/price-input";
import { useCreateProduct } from "@/features/marketplace/products/api/use-create-product";

// model Product {
//   id          String    @id @default(cuid())
//   name        String
//   description String?
//   price       Float
//   imageUrl    String?
//   sellerId    String    // ID user dari Clerk
//   categoryId  String?
//   category    Category? @relation(fields: [categoryId], references: [id])
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
//   @@map("products")
//   OrderItem OrderItem[]
// }

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
  sellerId: z.string().min(1, "Seller ID is required"),
  imageUrl: z.string().url("Invalid URL"),
});

export default function CreateProductModal() {
  const { isOpen, closeModal } = useModalStore();
  const { user } = useUser(); // Ambil user dari Clerk
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // State to store the uploaded image URL

  const sellerId = user?.id || ""; // Ambil ID user Clerk sebagai sellerId

  const createProductMutation = useCreateProduct(); // Call the hook to get the mutation object

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      sellerId: sellerId, // Set default sellerId dari Clerk
      imageUrl: "", // Set default image to null
    },
  });

  const isLoading = createProductMutation.status === "pending";

  if (isLoading) {
    // Handle loading state
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    createProductMutation.mutate({
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      sellerId: user?.id || "", // Provide a fallback value for sellerId
      imageUrl: imageUrl, // File image
    });
    closeModal(); // Close the modal after upload attempt
  }

  const handleUpload = async (onChange: (value: string) => void) => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(selectedFile);
      onChange(url); // Store the Cloudinary URL in form
      console.log(url);
      setImageUrl(url); // Store the URL in state if needed
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Product</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">Fill the form below to add a new product.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>This is your product name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>This is your public description product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <PriceInput {...field} value={field.value} />
                  </FormControl>
                  <FormDescription>This is your product price.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[500px]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">Coding</SelectItem>
                          <SelectItem value="2">Fixing Code</SelectItem>
                          <SelectItem value="3">Nextvul Project</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>This is your product category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <ImageUploader /> */}

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} disabled={uploading} />
                      <Button type="button" onClick={() => handleUpload(field.onChange)} disabled={!selectedFile || uploading}>
                        {uploading ? "Uploading..." : "Upload Image"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>This is your product image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 space-x-4">
              <Button className="w-full" type="submit" disabled={createProductMutation.status === "pending"}>
                {createProductMutation.status === "pending" ? "Submitting..." : "Submit"}
              </Button>

              <Button type="button" onClick={closeModal} variant="outline" className="rounded-md w-full m-4 pt-1">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
