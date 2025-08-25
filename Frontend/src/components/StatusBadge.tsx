import { Badge } from "@/components/ui/badge";
import type { DonationStatus } from "./DonationCard";

interface StatusBadgeProps {
  status: DonationStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: DonationStatus) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          variant: "default" as const,
          className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20 hover:bg-yellow-500/20"
        };
      case "approved":
        return {
          label: "Approved",
          variant: "default" as const,
          className: "bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20"
        };
      case "rejected":
        return {
          label: "Rejected",
          variant: "destructive" as const,
          className: "bg-red-500/10 text-red-700 border-red-500/20 hover:bg-red-500/20"
        };
      case "matched":
        return {
          label: "Matched",
          variant: "default" as const,
          className: "bg-blue-500/10 text-blue-700 border-blue-500/20 hover:bg-blue-500/20"
        };
      default:
        return {
          label: "Unknown",
          variant: "secondary" as const,
          className: ""
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant}
      className={config.className}
    >
      {config.label}
    </Badge>
  );
};