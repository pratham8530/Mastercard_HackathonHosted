import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { authApi, tokenStore } from "@/lib/api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'donor' | 'receiver' | 'admin') => void;
}

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    idProof: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, idProof: file }));
  };

  const submit = async (mode: 'login' | 'register') => {
    if (!formData.email || !formData.password) return alert('Email and password required');
    if (mode === 'register' && (!formData.username || !formData.role)) return alert('Name and role required');
    try {
      setLoading(true);
      const resp = mode === 'register'
        ? await authApi.register({ name: formData.username, email: formData.email, password: formData.password, role: formData.role as any })
        : await authApi.login({ email: formData.email, password: formData.password });
      tokenStore.set(resp.token);
      const role = (resp.user?.role || formData.role) as 'donor' | 'receiver' | 'admin';
      onLoginSuccess(role);
    } catch (e: any) {
      alert(e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Login / Register</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); submit('login'); }} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground font-medium">Name</Label>
            <Input id="username" type="text" placeholder="Your name" value={formData.username} onChange={(e) => handleInputChange("username", e.target.value)} className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
            <Input id="password" type="password" placeholder="Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="w-full" required />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Role (for registration)</Label>
            <Select onValueChange={(value) => handleInputChange("role", value)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Choose your role" /></SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="donor">Donor</SelectItem>
                <SelectItem value="receiver">Receiver</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" className="h-11" disabled={loading} onClick={() => submit('login')}>Login</Button>
            <Button type="button" className="h-11 bg-yellow-500 text-[#0F3D56] hover:bg-yellow-400" disabled={loading} onClick={() => submit('register')}>Register</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;