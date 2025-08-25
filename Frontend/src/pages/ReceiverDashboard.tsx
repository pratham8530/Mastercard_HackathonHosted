// import mongoose from "mongoose";    

// const requestSchema = new mongoose.Schema(
//   {
//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     itemsNeeded: { type: String, required: true },
//     description: { type: String, required: true },
//     category: {
//       type: String,
//       enum: [
//         "clothing",
//         "electronics",
//         "stationery",
//         "food",
//         "furniture",
//         "toys",
//         "others",
//       ],
//       required: true,
//     },
//     quantity: { type: Number, required: true },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "completed"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// const Request = mongoose.model("Request", requestSchema);
// export default Request;


import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Package,
  ClipboardList,
  CheckCircle2,
  Clock,
  XCircle,
  User,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  CalendarDays,
  MoreHorizontal,
  Bell,
  BellRing,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import Navbar from '../components/Navbar';

// Types
type RequestItem = {
  id: string;
  name: string;
  category: "Stationery" | "Clothes" | "Food" | "Books" | "Hygiene" | "Medicines" | "Shelter" | "Other";
  quantity: number;
  unit: "pcs" | "sets" | "kg" | "liters" | "packs";
  notes?: string;
};

type Request = {
  id: string;
  requestName: string;
  items: RequestItem[];
  category: RequestItem["category"];
  totalQuantity: number;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  description?: string;
};

type ReceiverDashboardProps = {
  isApproved?: boolean;
  initialRequests?: Request[];
  onLogout?: () => void;
};

// Dummy data
const dummyRequests: Request[] = [
  {
    id: "req-1",
    requestName: "School Supplies – Grade 4",
    category: "Stationery",
    items: [
      { id: "item-1", name: "Notebooks", category: "Stationery", quantity: 5, unit: "pcs", notes: "A4 size" },
      { id: "item-2", name: "Pencils", category: "Stationery", quantity: 12, unit: "pcs" },
    ],
    totalQuantity: 17,
    status: "Pending",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Essential supplies for Grade 4 students",
  },
  {
    id: "req-2",
    requestName: "Winter Clothes – Women",
    category: "Clothes",
    items: [
      { id: "item-3", name: "Sweaters", category: "Clothes", quantity: 3, unit: "pcs", notes: "Size M-L" },
      { id: "item-4", name: "Winter Coats", category: "Clothes", quantity: 2, unit: "pcs" },
    ],
    totalQuantity: 5,
    status: "Approved",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Winter clothing for women in need",
  },
  {
    id: "req-3",
    requestName: "Meal Packs – Weekend",
    category: "Food",
    items: [
      { id: "item-5", name: "Rice", category: "Food", quantity: 10, unit: "kg" },
      { id: "item-6", name: "Canned Goods", category: "Food", quantity: 20, unit: "pcs" },
    ],
    totalQuantity: 30,
    status: "Rejected",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Weekend meal preparations",
  },
  {
    id: "req-4",
    requestName: "Medical Supplies",
    category: "Medicines",
    items: [
      { id: "item-7", name: "First Aid Kit", category: "Medicines", quantity: 2, unit: "sets" },
      { id: "item-8", name: "Pain Relievers", category: "Medicines", quantity: 5, unit: "packs" },
    ],
    totalQuantity: 7,
    status: "Approved",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Basic medical supplies for emergency use",
  },
];

const categories = ["All", "Stationery", "Clothes", "Food", "Books", "Hygiene", "Medicines", "Shelter", "Other"];
const units = ["pcs", "sets", "kg", "liters", "packs"];
const statuses = ["All", "Pending", "Approved", "Rejected"];

// Helper functions
const getStatusColor = (status: Request["status"]) => {
  switch (status) {
    case "Pending":
      return "bg-warning-bg text-warning-foreground border-warning";
    case "Approved":
      return "bg-success-bg text-success-foreground border-success";
    case "Rejected":
      return "bg-destructive-bg text-destructive-foreground border-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getCategoryIcon = (category: RequestItem["category"]) => {
  switch (category) {
    case "Stationery":
      return <Edit className="h-4 w-4" />;
    case "Clothes":
      return <Package className="h-4 w-4" />;
    case "Food":
      return <Package className="h-4 w-4" />;
    case "Books":
      return <ClipboardList className="h-4 w-4" />;
    case "Medicines":
      return <Plus className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

// Notifications Component
const NotificationsPanel: React.FC = () => {
  const [notifications] = useState([
    { id: "1", message: "Your request 'School Supplies – Grade 4' has been approved", time: "2 hours ago", read: false },
    { id: "2", message: "New policy update: Request processing time reduced", time: "1 day ago", read: true },
    { id: "3", message: "Your request 'Meal Packs – Weekend' was rejected", time: "2 days ago", read: true },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2"
      >
        {unreadCount > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {showNotifications && (
        <Card className="absolute right-0 top-full mt-2 w-80 z-50 shadow-lg border">
          <CardHeader>
            <CardTitle className="text-sm">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b last:border-b-0 ${
                    !notification.read ? "bg-primary-bg/50" : ""
                  }`}
                >
                  <p className="text-sm text-secondary-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Filters Component
const FiltersCard: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onReset: () => void;
}> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onReset,
}) => {
  return (
    <Card className="rounded-2xl shadow-md" data-testid="filters-row">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by request name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="quantity-desc">Quantity High-Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" onClick={onReset} className="px-4">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Add Request Dialog
const AddRequestDialog: React.FC<{
  onAddRequest: (request: Omit<Request, "id" | "createdAt">) => void;
}> = ({ onAddRequest }) => {
  const [open, setOpen] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [description, setDescription] = useState("");
  const [primaryCategory, setPrimaryCategory] = useState<RequestItem["category"]>("Stationery");
  const [items, setItems] = useState<Omit<RequestItem, "id">[]>([
    { name: "", category: "Stationery", quantity: 1, unit: "pcs", notes: "" }
  ]);

  // Update items when primary category changes
  React.useEffect(() => {
    setItems(prevItems => prevItems.map(item => ({ ...item, category: primaryCategory })));
  }, [primaryCategory]);

  const addItem = () => {
    setItems([...items, { name: "", category: primaryCategory, quantity: 1, unit: "pcs", notes: "" }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof Omit<RequestItem, "id">, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const resetForm = () => {
    setRequestName("");
    setDescription("");
    setPrimaryCategory("Stationery");
    setItems([{ name: "", category: "Stationery", quantity: 1, unit: "pcs", notes: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestName.trim()) {
      toast.error("Request name is required");
      return;
    }

    const validItems = items.filter(item => item.name.trim());
    if (validItems.length === 0) {
      toast.error("At least one item with a name is required");
      return;
    }

    const requestItems: RequestItem[] = validItems.map(item => ({
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }));

    const totalQuantity = requestItems.reduce((sum, item) => sum + item.quantity, 0);

    const newRequest: Omit<Request, "id" | "createdAt"> = {
      requestName: requestName.trim(),
      description: description.trim() || undefined,
      items: requestItems,
      category: primaryCategory,
      totalQuantity,
      status: "Pending",
    };

    onAddRequest(newRequest);
    resetForm();
    setOpen(false);
    toast.success("Request created successfully (Pending)");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="add-request-btn" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Request</DialogTitle>
          <DialogDescription>
            Create a new request for items you need. Add multiple items and specify quantities.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requestName">Request Name *</Label>
              <Input
                id="requestName"
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                placeholder="e.g., School Supplies - Grade 4"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="primaryCategory">Primary Category</Label>
              <Select value={primaryCategory} onValueChange={(value: RequestItem["category"]) => setPrimaryCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional details about this request..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Items *</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        placeholder="Item name *"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Select 
                        value={primaryCategory} 
                        onValueChange={(value: RequestItem["category"]) => {
                          setPrimaryCategory(value);
                          // Update all items to have the same category as primary
                          const updatedItems = items.map(item => ({ ...item, category: value }));
                          setItems(updatedItems);
                        }}
                        disabled
                      >
                        <SelectTrigger className="bg-muted">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Select value={item.unit} onValueChange={(value: RequestItem["unit"]) => updateItem(index, "unit", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Notes"
                        value={item.notes || ""}
                        onChange={(e) => updateItem(index, "notes", e.target.value)}
                        className="flex-1"
                      />
                      {items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Create Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Request Detail Sheet
const RequestDetailSheet: React.FC<{
  request: Request | null;
  onUpdateRequest: (id: string, updates: Partial<Request>) => void;
}> = ({ request, onUpdateRequest }) => {
  const [status, setStatus] = useState<Request["status"]>("Pending");

  React.useEffect(() => {
    if (request) {
      setStatus(request.status);
    }
  }, [request]);

  const handleStatusUpdate = () => {
    if (request && status !== request.status) {
      onUpdateRequest(request.id, { status });
      toast.success(`Request status updated to ${status}`);
    }
  };

  if (!request) return null;

  return (
    <SheetContent className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>{request.requestName}</SheetTitle>
        <SheetDescription>
          Request details and status management
        </SheetDescription>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <div className="flex items-center gap-2">
            <Select value={status} onValueChange={(value: Request["status"]) => setStatus(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            {status !== request.status && (
              <Button size="sm" onClick={handleStatusUpdate}>Save</Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Created</span>
            <p className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Total Items</span>
            <p className="font-medium">{request.totalQuantity}</p>
          </div>
        </div>

        {request.description && (
          <div>
            <span className="text-sm text-muted-foreground">Description</span>
            <p className="mt-1">{request.description}</p>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-3">Items</h4>
          <div className="space-y-3">
            {request.items.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(item.category)}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.quantity} {item.unit} • {item.category}
                    </p>
                    {item.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Activity Timeline</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Request created</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(request.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {request.status !== "Pending" && (
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${
                  request.status === "Approved" ? "bg-success" : "bg-destructive"
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Status changed to {request.status}</p>
                  <p className="text-xs text-muted-foreground">Demo timeline entry</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SheetContent>
  );
};

// Main Dashboard Component
const ReceiverDashboard: React.FC<ReceiverDashboardProps> = ({ 
  isApproved = true, 
  initialRequests = dummyRequests,
  onLogout
}) => {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const itemsPerPage = 10;

  // Filter and sort logic
  const filteredAndSortedRequests = useMemo(() => {
    let filtered = requests.filter((request) => {
      const matchesSearch = request.requestName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || request.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || request.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name-asc":
          return a.requestName.localeCompare(b.requestName);
        case "quantity-desc":
          return b.totalQuantity - a.totalQuantity;
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [requests, searchTerm, categoryFilter, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRequests.length / itemsPerPage);
  const paginatedRequests = filteredAndSortedRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddRequest = (newRequestData: Omit<Request, "id" | "createdAt">) => {
    const newRequest: Request = {
      ...newRequestData,
      id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    setRequests([newRequest, ...requests]);
  };

  const handleUpdateRequest = (id: string, updates: Partial<Request>) => {
    setRequests(requests.map(req => req.id === id ? { ...req, ...updates } : req));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setStatusFilter("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // Approval gate
  if (!isApproved) {
    return (
      <div className="min-h-screen relative">
        {/* Blurred background */}
        <div className="blur-sm md:blur">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-secondary-foreground">Receiver Dashboard</h1>
                <p className="text-muted-foreground">Manage your requests and track status</p>
              </div>
              <div className="flex items-center gap-4">
                <Button disabled className="bg-primary">Add New Request</Button>
                <div className="h-10 w-10 bg-muted rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="h-24 bg-muted rounded-2xl"></div>
              <div className="h-24 bg-muted rounded-2xl"></div>
              <div className="h-24 bg-muted rounded-2xl"></div>
              <div className="h-24 bg-muted rounded-2xl"></div>
            </div>
            <div className="h-64 bg-muted rounded-2xl"></div>
          </div>
        </div>

        {/* Approval overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <Card className="w-full max-w-md mx-4 rounded-2xl shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <Clock className="h-16 w-16 text-primary mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-secondary-foreground mb-2">
                Waiting for Admin Approval
              </h2>
              <p className="text-muted-foreground">
                Your account is pending approval from an administrator. 
                You'll receive access to the dashboard once approved.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-secondary pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary-foreground">Receiver Dashboard</h1>
              <p className="text-muted-foreground">Manage your requests and track their status</p>
            </div>
            <div className="flex items-center gap-4">
              <AddRequestDialog onAddRequest={handleAddRequest} />
              <NotificationsPanel />
              {onLogout && (
                <Button onClick={onLogout} variant="outline" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>


        {/* Filters */}
        <FiltersCard
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={resetFilters}
        />

        {/* Table */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-0">
            {paginatedRequests.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary-foreground mb-2">No requests found</h3>
                <p className="text-muted-foreground mb-4">
                  {filteredAndSortedRequests.length === 0 && requests.length > 0
                    ? "Try adjusting your filters"
                    : "Get started by creating your first request"}
                </p>
                <AddRequestDialog onAddRequest={handleAddRequest} />
              </div>
            ) : (
              <>
                <Table data-testid="requests-table">
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead>Request Name</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Total Qty</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRequests.map((request, index) => (
                      <TableRow 
                        key={request.id} 
                        className={`hover:bg-muted/50 transition-colors ${
                          index % 2 === 1 ? "bg-muted/20" : ""
                        }`}
                      >
                        <TableCell className="font-medium">{request.requestName}</TableCell>
                        <TableCell>{request.items.length}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(request.category)}
                            <span className="text-sm">{request.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>{request.totalQuantity}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            data-testid="status-badge"
                            className={`${getStatusColor(request.status)} border`}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedRequest(request)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <RequestDetailSheet 
                              request={selectedRequest} 
                              onUpdateRequest={handleUpdateRequest}
                            />
                          </Sheet>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(currentPage * itemsPerPage, filteredAndSortedRequests.length)} of{" "}
                      {filteredAndSortedRequests.length} results
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className="w-8"
                            >
                              {page}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceiverDashboard;