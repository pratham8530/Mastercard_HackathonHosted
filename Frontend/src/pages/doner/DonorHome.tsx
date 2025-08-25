import { Link } from "react-router-dom";
import { Plus, TrendingUp, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonationCard } from "@/components/DonationCard";
import { useDonations } from "@/hooks/useDonations";
import DonorLayout from "./DonorLayout";

const DonorHome = () => {
  const { donations } = useDonations();

  const totalDonations = donations.length;
  const pendingDonations = donations.filter(d => d.status === "pending").length;
  const approvedDonations = donations.filter(d => d.status === "approved").length;
  const matchedDonations = donations.filter(d => d.status === "matched").length;

  const recentDonations = donations.slice(0, 6);

  return (
    <DonorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Track your donations and make a difference</p>
          </div>
          <Button asChild className="h-11 px-5 bg-yellow-500 text-[#0F3D56] hover:bg-yellow-400">
            <Link to="/create" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create New Donation</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDonations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingDonations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedDonations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matched</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{matchedDonations}</div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Recent Donations</h3>
            <Button variant="outline" asChild>
              <Link to="/my-donations">View All</Link>
            </Button>
          </div>

          {recentDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">No donations yet</h4>
              <p className="text-muted-foreground mb-4">
                Start making a difference by creating your first donation
              </p>
              <Button asChild>
                <Link to="/create">Create Your First Donation</Link>
              </Button>
            </Card>
          )}
        </div>
      </div>
    </DonorLayout>
  );
};

export default DonorHome;