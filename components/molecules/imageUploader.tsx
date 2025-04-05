"use client";

import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImageToCloudinary } from "@/lib/cloudinary"; // Adjust path
import { toast } from "sonner"; // Optional toast

export default function ImageUploader({ form }: { form: any }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (onChange: (value: string) => void) => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(selectedFile);
      onChange(url); // Store the Cloudinary URL in form
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name="image"
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
  );
}
