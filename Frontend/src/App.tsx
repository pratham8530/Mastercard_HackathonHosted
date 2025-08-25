import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import DonorHome from './pages/doner/DonorHome';
import MyDonations from './pages/doner/MyDonations';
import CreateDonationForm from './pages/doner/CreateDonationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/donor" element={<DonorHome />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/create" element={<CreateDonationForm />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;