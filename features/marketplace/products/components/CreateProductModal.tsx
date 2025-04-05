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
import ImageUploader from "@/components/molecules/imageUploader";

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
  Image: z
    .any()
    .refine((file) => file?.length === 1, "File harus diunggah")
    .refine(
      (file) => file?.[0]?.size <= 2 * 1024 * 1024, // Maksimal 2MB
      "Ukuran file maksimal 2MB"
    )
    .refine((file) => ["image/jpeg", "image/png"].includes(file?.[0]?.type), "Format file harus JPG atau PNG"),
});

export default function CreateProductModal() {
  const { isOpen, closeModal } = useModalStore();
  const { user } = useUser(); // Ambil user dari Clerk
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
    },
  });

  const isLoading = createProductMutation.status === "pending";

  if (isLoading) {
    // Handle loading state
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    createProductMutation({
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      sellerId, // Pakai sellerId dari Clerk
      Image: data.ImageUrl, // File image
    })
      .then(() => {
        closeModal();
        form.reset();
      })
      .catch((error: any) => {
        console.error("Error creating product:", error);
      });
  }

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
                          <SelectItem value="Coding">Coding</SelectItem>
                          <SelectItem value="Fix Code">Fixing Code</SelectItem>
                          <SelectItem value="Nextvul Project">Nextvul Project</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>This is your product category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ImageUploader control={form.control} />

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
