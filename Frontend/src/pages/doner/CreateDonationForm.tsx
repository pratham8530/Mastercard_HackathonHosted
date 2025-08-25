import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Package } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/ImageUploader";
import { useDonations } from "@/hooks/useDonations";
import DonorLayout from "./DonorLayout";
import { tokenStore, createDonation } from "@/lib/api";

interface DonationItem {
  category: string;
  itemName: string;
  description: string;
  quantity: number;
  image?: string;
  imageFile?: File;
}

interface FormData {
  items: DonationItem[];
}

const categories = [
  "Clothes",
  "Stationery", 
  "Furniture",
  "Electronics",
  "Toys",
  "Other"
];

const CreateDonationForm = () => {
  const navigate = useNavigate();
  const { addDonation } = useDonations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, register, formState: { errors }, setValue, watch } = useForm<FormData>({
    defaultValues: {
      items: [
        {
          category: "",
          itemName: "",
          description: "",
          quantity: 1,
          image: "",
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchedItems = watch("items");

  const handleImageSelect = (index: number, file: File, preview: string) => {
    setValue(`items.${index}.image`, preview);
    setValue(`items.${index}.imageFile`, file);
  };

  const handleImageRemove = (index: number) => {
    setValue(`items.${index}.image`, "");
    setValue(`items.${index}.imageFile`, undefined);
  };

  const addAnotherItem = () => {
    append({
      category: "",
      itemName: "",
      description: "",
      quantity: 1,
      image: "",
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const token = tokenStore.get();
      console.log(token);
      for (const item of data.items) {
        const formData = new FormData();
        formData.append("title", item.itemName);
        formData.append("category", item.category);
        formData.append("description", item.description);
        formData.append("quantity", String(item.quantity));
        if (item.imageFile) {
          formData.append("image", item.imageFile);
        }
        await createDonation(formData, token || "");
      }
      toast.success(`${data.items.length} donation${data.items.length > 1 ? "s" : ""} submitted successfully!`);
      navigate("/my-donations");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DonorLayout>
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-foreground">Create Donation</h1>
        <p className="text-muted-foreground">Add items you'd like to donate to help others</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Item {index + 1}</span>
                </CardTitle>
                {fields.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`items.${index}.category`}>Category *</Label>
                  <Select onValueChange={(value) => setValue(`items.${index}.category`, value)} defaultValue={watchedItems[index]?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.items?.[index]?.category && <p className="text-sm text-red-500 mt-1">Category is required</p>}
                </div>

                <div>
                  <Label htmlFor={`items.${index}.itemName`}>Item Name *</Label>
                  <Input {...register(`items.${index}.itemName`, { required: "Item name is required" })} placeholder="e.g., Winter Jacket" />
                  {errors.items?.[index]?.itemName && <p className="text-sm text-red-500 mt-1">{errors.items[index]?.itemName?.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor={`items.${index}.description`}>Description *</Label>
                <Textarea {...register(`items.${index}.description`, { required: "Description is required" })} placeholder="Describe the item condition, size, etc." rows={3} />
                {errors.items?.[index]?.description && <p className="text-sm text-red-500 mt-1">{errors.items[index]?.description?.message}</p>}
              </div>

              <div>
                <Label htmlFor={`items.${index}.quantity`}>Quantity *</Label>
                <Input type="number" min="1" {...register(`items.${index}.quantity`, { required: "Quantity is required", min: { value: 1, message: "Quantity must be at least 1" } })} />
                {errors.items?.[index]?.quantity && <p className="text-sm text-red-500 mt-1">{errors.items[index]?.quantity?.message}</p>}
              </div>

              <div>
                <Label>Upload Image</Label>
                <ImageUploader preview={watchedItems[index]?.image} onImageSelect={(file, preview) => handleImageSelect(index, file, preview)} onImageRemove={() => handleImageRemove(index)} />
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button type="button" variant="outline" onClick={addAnotherItem} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Another Item</span>
          </Button>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} size="lg" className="bg-yellow-500 text-[#0F3D56] hover:bg-yellow-400">
              {isSubmitting ? "Submitting..." : "Submit Donation Request"}
            </Button>
          </div>
        </div>
      </form>
    </DonorLayout>
  );
};

export default CreateDonationForm;
