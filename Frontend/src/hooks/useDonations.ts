import { useState } from "react";
import type { Donation, DonationStatus } from "@/components/DonationCard";

//const [donations, setDonations] = useState<Donation[]>([]);

// Mock data
// const mockDonations: Donation[] = [
//   {
//     id: "1",
//     itemName: "Winter Jacket",
//     category: "Clothes",
//     description: "Warm winter jacket, size M, barely used",
//     quantity: 1,
//     status: "approved",
//     image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=400",
//     createdAt: "2024-01-15T10:30:00Z",
//   },
//   {
//     id: "2",
//     itemName: "School Supplies Set",
//     category: "Stationery",
//     description: "Complete set of notebooks, pens, and pencils for students",
//     quantity: 5,
//     status: "pending",
//     image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
//     createdAt: "2024-01-14T14:20:00Z",
//   },
//   {
//     id: "3",
//     itemName: "Wooden Desk",
//     category: "Furniture",
//     description: "Solid wood study desk in excellent condition",
//     quantity: 1,
//     status: "matched",
//     image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
//     createdAt: "2024-01-12T09:15:00Z",
//   },
//   {
//     id: "4",
//     itemName: "Children's Books",
//     category: "Other",
//     description: "Collection of educational children's books, ages 5-10",
//     quantity: 20,
//     status: "approved",
//     createdAt: "2024-01-10T16:45:00Z",
//   },
//   {
//     id: "5",
//     itemName: "Laptop Computer",
//     category: "Electronics",
//     description: "Working laptop computer for student use",
//     quantity: 1,
//     status: "rejected",
//     image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
//     createdAt: "2024-01-08T11:30:00Z",
//   },
// ];

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  //const [donations, setDonations] = useState<Donation[]>(mockDonations);

  const addDonation = (
    newDonation: Omit<Donation, "id" | "status" | "createdAt">
  ) => {
    const donation: Donation = {
      ...newDonation,
      id: Date.now().toString(),
      status: "pending" as DonationStatus,
      createdAt: new Date().toISOString(),
    };

    setDonations((prev) => [donation, ...prev]);
  };

  const updateDonationStatus = (id: string, status: DonationStatus) => {
    setDonations((prev) =>
      prev.map((donation) =>
        donation.id === id ? { ...donation, status } : donation
      )
    );
  };

  return {
    donations,
    addDonation,
    updateDonationStatus,
  };
};