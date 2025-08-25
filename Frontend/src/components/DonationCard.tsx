import { StatusBadge } from "./StatusBadge";
import { Card, CardContent } from "@/components/ui/card";

export type DonationStatus = "pending" | "approved" | "rejected" | "matched";

export interface Donation {
  id: string;
  itemName: string;
  category: string;
  description: string;
  quantity: number;
  status: DonationStatus;
  image?: string;
  createdAt: string;
}

interface DonationCardProps {
  donation: Donation;
  showCategory?: boolean;
}

export const DonationCard = ({ donation, showCategory = true }: DonationCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {donation.image ? (
          <img
            src={donation.image}
            alt={donation.itemName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground truncate">{donation.itemName}</h3>
          <StatusBadge status={donation.status} />
        </div>
        
        {showCategory && (
          <p className="text-sm text-muted-foreground mb-1">{donation.category}</p>
        )}
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {donation.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Qty: {donation.quantity}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(donation.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};