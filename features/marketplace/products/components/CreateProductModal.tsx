// "use client";
// import { useMutation } from "@tanstack/react-query";
// import { createProduct } from "@/features/marketplace/products/api/use-post-products";
// import useModalStore from "@/store/useModalStore";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const formSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().min(1, "Description is required"),
//   price: z.coerce.number().min(1, "Price must be a positive number"),
//   sellerId: z.string().min(1, "Seller ID is required"),
//   categoryId: z.string().min(1, "Category ID is required"),
//   image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
// });

// type FormValues = z.infer<typeof formSchema>;

// const categories = ["Software", "Coding", "Design", "Marketing", "Finance"];

// export default function CreateProductModal() {
//   const { isOpen, closeModal } = useModalStore();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

//   const mutation = useMutation({
//     mutationFn: createProduct,
//     onSuccess: () => {
//       alert("Product Created!");
//       reset();
//       closeModal();
//     },
//     onError: (error) => {
//       console.error("Failed to create product:", error);
//     },
//   });

//   if (!isOpen) return null;

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", data.price.toString());
//     formData.append("sellerId", data.sellerId);
//     formData.append("categoryId", data.categoryId);
//     formData.append("image", data.image[0]);
//     mutation.mutate(formData);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={closeModal}>
//       <DialogContent className="sm:max-w-[500px] p-6 rounded-lg shadow-lg">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Add Product</DialogTitle>
//           <DialogDescription className="text-sm text-gray-500">Fill the form below to add a new product.</DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid gap-4">
//             {/* Name */}
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" {...register("name")} className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

//             {/* Description */}
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" {...register("description")} className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}

//             {/* Price */}
//             <Label htmlFor="price">Price (IDR)</Label>
//             <Input id="price" type="number" {...register("price")} className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}

//             {/* Category ID */}
//             <Label htmlFor="categoryId">Category</Label>
//             <Select onValueChange={(value: any) => register("categoryId").onChange({ target: { value } })}>
//               <SelectTrigger className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
//                 <SelectValue placeholder="Select Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map((category) => (
//                   <SelectItem key={category} value={category}>
//                     {category}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId.message}</span>}

//             {/* Image */}
//             <Label htmlFor="image">Image</Label>
//             <Input id="image" type="file" accept="image/*" {...register("image")} className="border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//             {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
//           </div>

//           <DialogFooter className="mt-2 w-full">
//             <Button type="submit" disabled={mutation.status === "pending"} className="rounded-md">
//               {mutation.status === "pending" ? "Creating..." : "Create"}
//             </Button>
//             <Button type="button" onClick={closeModal} variant="outline" className="rounded-md">
//               Cancel
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import useModalStore from "@/store/useModalStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PriceInput } from "@/components/molecules/price-input";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  categoryId: z.string().min(1, "Category ID is required"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
});

export default function CreateProductModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
    },
  });

  const { isOpen, closeModal } = useModalStore();

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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
                    <PriceInput {...field} value={field.value.toString()} />
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

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files)} ref={field.ref} />
                  </FormControl>
                  <FormDescription>This is your product image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 space-x-4">
              <Button className="w-full " type="submit">
                Submit
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
