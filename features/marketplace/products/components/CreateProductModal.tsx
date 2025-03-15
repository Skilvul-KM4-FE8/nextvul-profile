"use client";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/features/marketplace/products/api/use-post-products";
import useModalStore from "@/store/useModalStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  sellerId: z.string().min(1, "Seller ID is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
});

type FormValues = z.infer<typeof formSchema>;

const categories = ["Software", "Coding", "Design", "Marketing", "Finance"];

export default function CreateProductModal() {
  const { isOpen, closeModal } = useModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      alert("Product Created!");
      reset();
      closeModal();
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
    },
  });

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("sellerId", data.sellerId);
    formData.append("categoryId", data.categoryId);
    formData.append("image", data.image[0]);
    mutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Product</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">Fill the form below to add a new product.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            {/* Name */}
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

            {/* Description */}
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register("description")} className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}

            {/* Price */}
            <Label htmlFor="price">Price (IDR)</Label>
            <Input id="price" type="number" {...register("price")} className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}

            {/* Category ID */}
            <Label htmlFor="categoryId">Category</Label>
            <Select onValueChange={(value: any) => register("categoryId").onChange({ target: { value } })}>
              <SelectTrigger className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId.message}</span>}

            {/* Image */}
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" accept="image/*" {...register("image")} className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
          </div>

          <DialogFooter className="mt-2 w-full">
            <Button type="submit" disabled={mutation.status === "pending"} className="rounded-md">
              {mutation.status === "pending" ? "Creating..." : "Create"}
            </Button>
            <Button type="button" onClick={closeModal} variant="outline" className="rounded-md">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
