import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Filter, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { DonationCard, type DonationStatus } from "@/components/DonationCard";
import { useDonations } from "@/hooks/useDonations";
import DonorLayout from "./DonorLayout";

const MyDonations = () => {
  const { donations } = useDonations();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "matched", label: "Matched" },
    { value: "rejected", label: "Rejected" },
  ];

  const header = (
    <div className="flex items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-bold text-foreground">My Donations</h1>
        <p className="text-muted-foreground">{donations.length} donation{donations.length !== 1 ? 's' : ''} total</p>
      </div>
      <Button asChild>
        <Link to="/create" className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create New Donation</span>
        </Link>
      </Button>
    </div>
  );

  if (donations.length === 0) {
    return (
      <DonorLayout>
        {header}
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No donations yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            You haven't created any donation requests yet. Start making a difference by creating your first donation!
          </p>
          <Button asChild size="lg" className="bg-yellow-500 text-[#0F3D56] hover:bg-yellow-400">
            <Link to="/create" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create Your First Donation</span>
            </Link>
          </Button>
        </div>
      </DonorLayout>
    );
  }

  return (
    <DonorLayout>
      {header}
      <Card className="p-4 mt-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <Input placeholder="Search donations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="sm:max-w-sm" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center mt-6">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium mb-2">No donations found</h4>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}>Clear Filters</Button>
        </Card>
      )}
    </DonorLayout>
  );
};

export default MyDonations;