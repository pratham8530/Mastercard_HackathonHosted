import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReceiverDashboard from "@/pages/ReceiverDashboard";
import DonorHome from "@/pages/doner/DonorHome";
import CreateDonationForm from "@/pages/doner/CreateDonationForm";
import MyDonations from "@/pages/doner/MyDonations";
import AdminDashboard from "@/pages/AdminDashboard";
import LandingPage from "@/components/LandingPage";

type UserRole = 'donor' | 'receiver' | 'admin' | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'donor') navigate('/');
  };

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  if (!userRole) {
    return <LandingPage onLogin={handleLogin} />;
  }

  if (userRole === 'donor') {
    if (pathname === '/create') return <CreateDonationForm />;
    if (pathname === '/my-donations') return <MyDonations />;
    return <DonorHome />;
  }

  switch (userRole) {
    case 'receiver':
      return <ReceiverDashboard isApproved={true} onLogout={handleLogout} />;
    case 'admin':
      return <AdminDashboard onLogout={handleLogout} />;
    default:
      return <LandingPage onLogin={handleLogin} />;
  }
};

export default Index;
