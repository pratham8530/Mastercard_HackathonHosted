// import React, { useState } from 'react';
// import './App.css';

// // --- MOCK DATA (UPDATED WITH NEW SCHEMA) ---
// const initialPendingReceivers = [
//   { id: 'r1', name: 'Orphanage Home', title: 'Winter Wear', description: 'Requires sweaters and jackets for children aged 5-12.', category: 'clothing', quantity: 50, image: 'https://via.placeholder.com/150?text=Clothing' },
//   { id: 'r3', name: 'Community School', title: 'Notebooks', description: 'Notebooks and pens for underprivileged students.', category: 'stationery', quantity: 200, image: 'https://via.placeholder.com/150?text=Stationery' },
//   { id: 'r4', name: 'New Community Library', title: 'Chairs', description: 'Sturdy wooden or plastic chairs for the reading area.', category: 'furniture', quantity: 20, image: 'https://via.placeholder.com/150?text=Furniture' },
//   { id: 'r5', name: 'Youth Center', title: 'Used Laptops', description: 'Functional laptops for coding classes for teenagers.', category: 'electronics', quantity: 5, image: 'https://via.placeholder.com/150?text=Electronics' },
// ];

// const initialPendingDonors = [
//   { id: 'd1', name: 'Asha Sharma', title: 'Winter Wear', description: 'Mixed collection of used sweaters and jackets.', category: 'clothing', quantity: 60, condition: 'Good', image: 'https://via.placeholder.com/150?text=Clothing' },
//   { id: 'd2', name: 'Retail Store Warehouse', title: 'Adult Male Apparel', description: 'Surplus new stock of shirts and trousers.', category: 'clothing', quantity: 150, condition: 'New', image: 'https://via.placeholder.com/150?text=Clothing' },
//   { id: 'd4', name: 'Vikram Singh', title: 'Dining Chairs', description: 'Dining chairs, good condition.', category: 'furniture', quantity: 25, condition: 'Used', image: 'https://via.placeholder.com/150?text=Furniture' },
//   { id: 'd7', name: 'Riya Foundation', title: 'Mixed Toys', description: 'Collection of board games, dolls, and cars.', category: 'toys', quantity: 50, condition: 'Good', image: 'https://via.placeholder.com/150?text=Toys' },
// ];

// // Assume these are the items already approved for matching
// const allReceivers = [...initialPendingReceivers];
// const allDonors = [...initialPendingDonors];

// interface AdminDashboardProps {
//   onLogout: () => void;
// }

// // --- MAIN APP COMPONENT ---
// function AdminDashboard({ onLogout }: AdminDashboardProps) {
//   const [currentView, setCurrentView] = useState('home'); // 'home', 'approval', 'matching', 'distribution'
//   const [pendingReceivers, setPendingReceivers] = useState(initialPendingReceivers);
//   const [pendingDonors, setPendingDonors] = useState(initialPendingDonors);
//   const [selectedReceiver, setSelectedReceiver] = useState(null);
//   const [selectedDonors, setSelectedDonors] = useState([]);

//   const handleApproval = (id, type) => {
//     if (type === 'receiver') {
//       setPendingReceivers(prev => prev.filter(item => item.id !== id));
//     } else {
//       setPendingDonors(prev => prev.filter(item => item.id !== id));
//     }
//     alert(`Item ${id} has been APPROVED.`);
//   };

//   const handleDenial = (id, type) => {
//     if (type === 'receiver') {
//       setPendingReceivers(prev => prev.filter(item => item.id !== id));
//     } else {
//       setPendingDonors(prev => prev.filter(item => item.id !== id));
//     }
//     alert(`Item ${id} has been DENIED.`);
//   };

//   const handleProceedToDistribution = (receiver, donors) => {
//     setSelectedReceiver(receiver);
//     setSelectedDonors(donors);
//     setCurrentView('distribution');
//   };

//   return (
//     <div className="App">
//       {/* Header with Logout */}
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center', 
//         padding: '1rem', 
//         backgroundColor: '#f8f9fa', 
//         borderBottom: '1px solid #e9ecef' 
//       }}>
//         <h1 style={{ margin: 0, color: '#333' }}>SEVA SAHYOG Admin Portal</h1>
//         <button 
//           onClick={onLogout}
//           style={{
//             padding: '0.5rem 1rem',
//             backgroundColor: '#dc3545',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       {currentView === 'home' && (
//         <HomePage 
//           onNavigateToApproval={() => setCurrentView('approval')}
//           onNavigateToMatching={() => setCurrentView('matching')} 
//         />
//       )}
//       {currentView === 'approval' && (
//         <ApprovalPage 
//           receivers={pendingReceivers}
//           donors={pendingDonors}
//           onApprove={handleApproval}
//           onDeny={handleDenial}
//           onBack={() => setCurrentView('home')}
//         />
//       )}
//       {currentView === 'matching' && (
//         <MatchingPage onNavigateToDistribution={handleProceedToDistribution} />
//       )}
//       {currentView === 'distribution' && (
//         <DonationDistributionPage
//           receiver={selectedReceiver}
//           donors={selectedDonors}
//           onBack={() => setCurrentView('matching')}
//         />
//       )}
//     </div>
//   );
// }

// // --- HOME PAGE COMPONENT ---
// const HomePage = ({ onNavigateToApproval, onNavigateToMatching }) => {
//   return (
//     <div className="page-container">
//       <h1>SEVA SAHYOG Admin Portal</h1>
//       <div className="button-container">
//         <button className="home-button" onClick={onNavigateToApproval}>APPROVAL</button>
//         <button className="home-button" onClick={onNavigateToMatching}>MATCHING</button>
//       </div>
//     </div>
//   );
// };

// // --- APPROVAL PAGE COMPONENT ---
// const ApprovalPage = ({ receivers, donors, onApprove, onDeny, onBack }) => {
//   const [category, setCategory] = useState('');

//   const filteredReceivers = receivers.filter(r => r.category === category);
//   const filteredDonors = donors.filter(d => d.category === category);

//   return (
//     <div className="page-container">
//       <h2>Pending Approvals</h2>
//       <div className="dropdown-container">
//         <label htmlFor="donationCategory">Select Donation Category: </label>
//         <select id="donationCategory" value={category} onChange={e => setCategory(e.target.value)}>
//           <option value="" disabled>-- Choose a category --</option>
//           <option value="stationery">Stationery</option>
//           <option value="clothing">Clothing</option>
//           <option value="furniture">Furniture</option>
//           <option value="electronics">Electronics</option>
//           <option value="toys">Toys</option>
//           <option value="others">Others</option>
//         </select>
//       </div>

//       {category && (
//         <div className="columns-container">
//           <div className="column">
//             <h3>PENDING RECEIVERS</h3>
//             {filteredReceivers.length > 0 ? filteredReceivers.map(item => (
//               <div key={item.id} className="card approval-card">
//                 <img src={item.image} alt={item.title} className="card-image"/>
//                 <p><strong>Category:</strong> {item.category}</p>
//                 <p><strong>Item:</strong> {item.title}</p>
//                 <p><strong>Quantity:</strong> {item.quantity}</p>
//                 <div className="card-actions">
//                   <button className="approve-btn" onClick={() => onApprove(item.id, 'receiver')}>APPROVE</button>
//                   <button className="deny-btn" onClick={() => onDeny(item.id, 'receiver')}>DENY</button>
//                 </div>
//               </div>
//             )) : <p>No pending receivers in this category.</p>}
//           </div>
//           <div className="column">
//             <h3>PENDING DONORS</h3>
//             {filteredDonors.length > 0 ? filteredDonors.map(item => (
//               <div key={item.id} className="card approval-card">
//                 <img src={item.image} alt={item.title} className="card-image"/>
//                 <p><strong>Category:</strong> {item.category}</p>
//                 <p><strong>Item:</strong> {item.title}</p>
//                 <p><strong>Quantity:</strong> {item.quantity}</p>
//                 <div className="card-actions">
//                    <button className="approve-btn" onClick={() => onApprove(item.id, 'donor')}>APPROVE</button>
//                    <button className="deny-btn" onClick={() => onDeny(item.id, 'donor')}>DENY</button>
//                 </div>
//               </div>
//             )) : <p>No pending donors in this category.</p>}
//           </div>
//         </div>
//       )}
//        <button className="action-button" onClick={onBack}>BACK TO HOME</button>
//     </div>
//   );
// };


// // --- MATCHING PAGE COMPONENT ---
// const MatchingPage = ({ onNavigateToDistribution }) => {
//   const [donationType, setDonationType] = useState('');
//   const [filteredReceivers, setFilteredReceivers] = useState([]);
//   const [filteredDonors, setFilteredDonors] = useState([]);
//   const [selectedReceiverId, setSelectedReceiverId] = useState(null);
//   const [selectedDonorIds, setSelectedDonorIds] = useState([]);

//   const showNextButton = selectedReceiverId && selectedDonorIds.length > 0;

//   const handleTypeChange = (e) => {
//     const type = e.target.value;
//     setDonationType(type);
//     setFilteredReceivers(allReceivers.filter(r => r.category === type));
//     setFilteredDonors(allDonors.filter(d => d.category === type));
//     setSelectedReceiverId(null);
//     setSelectedDonorIds([]);
//   };

//   const handleReceiverSelect = (id) => setSelectedReceiverId(id);

//   const handleDonorSelect = (id) => {
//     setSelectedDonorIds(prevIds =>
//       prevIds.includes(id)
//         ? prevIds.filter(donorId => donorId !== id)
//         : [...prevIds, id]
//     );
//   };

//   const handleNextClick = () => {
//     const receiver = allReceivers.find(r => r.id === selectedReceiverId);
//     const donors = allDonors.filter(d => selectedDonorIds.includes(d.id));
//     onNavigateToDistribution(receiver, donors);
//   };

//   return (
//     <div className="page-container">
//       <h2>Match Donations</h2>
//       <div className="dropdown-container">
//         <label htmlFor="donationType">Select Donation Type: </label>
//         <select id="donationType" value={donationType} onChange={handleTypeChange}>
//           <option value="" disabled>-- Choose a type --</option>
//           <option value="stationery">Stationery</option>
//           <option value="clothing">Clothing</option>
//           <option value="furniture">Furniture</option>
//           <option value="electronics">Electronics</option>
//           <option value="toys">Toys</option>
//           <option value="others">Others</option>
//         </select>
//       </div>

//       {donationType && (
//         <div className="columns-container">
//           <div className="column">
//             <h3>RECEIVER</h3>
//             {filteredReceivers.map(receiver => (
//               <div
//                 key={receiver.id}
//                 className={`card ${selectedReceiverId === receiver.id ? 'selected-receiver' : ''}`}
//                 onClick={() => handleReceiverSelect(receiver.id)}
//               >
//                 <strong>{receiver.name}</strong>
//                 <p><strong>Item:</strong> {receiver.title}</p>
//                 <p><strong>Quantity Needed:</strong> {receiver.quantity}</p>
//                 <p><strong>Description:</strong> {receiver.description}</p>
//               </div>
//             ))}
//           </div>
//           <div className="column">
//             <h3>DONOR</h3>
//             {filteredDonors.map(donor => (
//               <div
//                 key={donor.id}
//                 className={`card ${selectedDonorIds.includes(donor.id) ? 'selected-donor' : ''}`}
//                 onClick={() => handleDonorSelect(donor.id)}
//               >
//                 <strong>{donor.name}</strong>
//                 <p><strong>Item:</strong> {donor.title}</p>
//                 <p><strong>Quantity:</strong> {donor.quantity}</p>
//                 <p><strong>Condition:</strong> {donor.condition}</p>
//                 <p><strong>Description:</strong> {donor.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showNextButton && (
//         <button className="action-button" onClick={handleNextClick}>NEXT</button>
//       )}
//     </div>
//   );
// };

// // --- DISTRIBUTION PAGE COMPONENT ---
// const DonationDistributionPage = ({ receiver, donors, onBack }) => {
//   return (
//     <div className="page-container">
//       <h2>DONATION DISTRIBUTION</h2>
//       <div className="summary-section">
//         <h3>Selected Receiver</h3>
//         <div className="card summary-card">
//           <strong>{receiver.name}</strong>
//           <p><strong>Item:</strong> {receiver.title}</p>
//           <p><strong>Quantity Needed:</strong> {receiver.quantity}</p>
//           <p><strong>Description:</strong> {receiver.description}</p>
//         </div>
//       </div>
//       <div className="summary-section">
//         <h3>Selected Donors</h3>
//         {donors.map(donor => (
//           <div key={donor.id} className="card summary-card">
//             <strong>{donor.name}</strong>
//             <p><strong>Item:</strong> {donor.title}</p>
//             <p><strong>Quantity:</strong> {donor.quantity}</p>
//             <p><strong>Condition:</strong> {donor.condition}</p>
//             <p><strong>Description:</strong> {donor.description}</p>
//           </div>
//         ))}
//       </div>
//       <div className="button-container">
//         <button className="action-button" onClick={onBack}>BACK</button>
//         <button className="action-button confirm-button" onClick={() => alert('Match Confirmed!')}>CONFIRM MATCH</button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from "react";
import "./App.css";

// API configuration
const API_BASE_URL = "http://localhost:4000/api";

// API service functions
const apiService = {
  // Fetch all donations
  getDonations: async () => {
  const response = await fetch(`${API_BASE_URL}/admin/donations`);
    if (!response.ok) throw new Error("Failed to fetch donations");
    return response.json();
  },

  // Fetch all requests
  getRequests: async () => {
  const response = await fetch(`${API_BASE_URL}/admin/requests`);
    if (!response.ok) throw new Error("Failed to fetch requests");
    return response.json();
  },

  // Fetch all matches
  getMatches: async () => {
  const response = await fetch(`${API_BASE_URL}/admin/matches`);
    if (!response.ok) throw new Error("Failed to fetch matches");
    return response.json();
  },

  // Update donation status
  updateDonationStatus: async (id: string, status: string) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/donations/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!response.ok) throw new Error("Failed to update donation status");
    return response.json();
  },

  // Update request status
  updateRequestStatus: async (id: string, status: string) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/requests/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!response.ok) throw new Error("Failed to update request status");
    return response.json();
  },

  // Create a match
  createMatch: async (donationId: string, requestId: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ donationId, requestId }),
    });
    if (!response.ok) throw new Error("Failed to create match");
    return response.json();
  },
};

interface AdminDashboardProps {
  onLogout: () => void;
}

// Data transformation functions to match the UI expectations
const transformDonationToUIFormat = (donation: any) => ({
  id: donation._id,
  name: donation.donor?.name || "Unknown Donor",
  title: donation.title,
  description: donation.description,
  category: donation.category,
  quantity: donation.quantity,
  condition: "Good", // Default condition as it's not in schema
  image:
    donation.image ||
    "https://via.placeholder.com/150?text=" + donation.category,
  status: donation.status,
  originalData: donation, // Keep original data for API calls
});

const transformRequestToUIFormat = (request: any) => ({
  id: request._id,
  name: request.receiver?.name || "Unknown Receiver",
  title: request.itemsNeeded,
  description: request.description,
  category: request.category,
  quantity: request.quantity,
  image: "https://via.placeholder.com/150?text=" + request.category,
  status: request.status,
  originalData: request, // Keep original data for API calls
});

// --- MAIN APP COMPONENT ---
function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState("home");
  const [pendingReceivers, setPendingReceivers] = useState([]);
  const [pendingDonors, setPendingDonors] = useState([]);
  const [allReceivers, setAllReceivers] = useState([]);
  const [allDonors, setAllDonors] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedDonors, setSelectedDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [donationsResult, requestsResult] = await Promise.all([
        apiService.getDonations(),
        apiService.getRequests(),
      ]);

      if (donationsResult.success && requestsResult.success) {
        const transformedDonations = donationsResult.data.map(
          transformDonationToUIFormat
        );
        const transformedRequests = requestsResult.data.map(
          transformRequestToUIFormat
        );

        // Filter pending items for approval page
        setPendingDonors(
          transformedDonations.filter((d) => d.status === "pending")
        );
        setPendingReceivers(
          transformedRequests.filter((r) => r.status === "pending")
        );

        // Store all approved items for matching page
        setAllDonors(
          transformedDonations.filter(
            (d) => d.status === "approved" || d.status === "pending"
          )
        );
        setAllReceivers(
          transformedRequests.filter(
            (r) => r.status === "approved" || r.status === "pending"
          )
        );
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id: string, type: "receiver" | "donor") => {
    setLoading(true);
    try {
      if (type === "receiver") {
        await apiService.updateRequestStatus(id, "approved");
        setPendingReceivers((prev) => prev.filter((item) => item.id !== id));
        // Add to allReceivers for matching
        const approvedItem = pendingReceivers.find((item) => item.id === id);
        if (approvedItem) {
          setAllReceivers((prev) => [
            ...prev,
            { ...approvedItem, status: "approved" },
          ]);
        }
      } else {
        await apiService.updateDonationStatus(id, "approved");
        setPendingDonors((prev) => prev.filter((item) => item.id !== id));
        // Add to allDonors for matching
        const approvedItem = pendingDonors.find((item) => item.id === id);
        if (approvedItem) {
          setAllDonors((prev) => [
            ...prev,
            { ...approvedItem, status: "approved" },
          ]);
        }
      }
  alert(`Item ${id} has been APPROVED.`);
    } catch (err) {
      setError("Failed to approve item: " + err.message);
      console.error("Error approving item:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDenial = async (id: string, type: "receiver" | "donor") => {
    setLoading(true);
    try {
      if (type === "receiver") {
        await apiService.updateRequestStatus(id, "completed"); // Using completed as "denied" equivalent
        setPendingReceivers((prev) => prev.filter((item) => item.id !== id));
      } else {
        await apiService.updateDonationStatus(id, "completed"); // Using completed as "denied" equivalent
        setPendingDonors((prev) => prev.filter((item) => item.id !== id));
      }
  alert(`Item ${id} has been DENIED.`);
    } catch (err) {
      setError("Failed to deny item: " + err.message);
      console.error("Error denying item:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToDistribution = (receiver: any, donors: any[]) => {
    setSelectedReceiver(receiver);
    setSelectedDonors(donors);
    setCurrentView("distribution");
  };

  const handleConfirmMatch = async (receiver: any, donors: any[]) => {
    setLoading(true);
    try {
      // Create matches for each donor with the receiver
      const matchPromises = donors.map((donor) =>
        apiService.createMatch(donor.id, receiver.id)
      );

      await Promise.all(matchPromises);

      // Remove matched items from available lists
      setAllReceivers((prev) => prev.filter((r) => r.id !== receiver.id));
      setAllDonors((prev) =>
        prev.filter((d) => !donors.some((donor) => donor.id === d.id))
      );

      alert("Match Confirmed Successfully!");
      setCurrentView("matching"); // Go back to matching page
    } catch (err) {
      setError("Failed to create match: " + err.message);
      console.error("Error creating match:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && currentView === "home") {
    return (
      <div className="page-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h2>Error: {error}</h2>
        <button onClick={fetchData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header with Logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <h1 style={{ margin: 0, color: "#333" }}>SEVA SAHYOG Admin Portal</h1>
        <button
          onClick={onLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {loading && (
        <div
          style={{
            padding: "1rem",
            textAlign: "center",
            backgroundColor: "#e3f2fd",
          }}
        >
          Loading...
        </div>
      )}

      {currentView === "home" && (
        <HomePage
          onNavigateToApproval={() => setCurrentView("approval")}
          onNavigateToMatching={() => setCurrentView("matching")}
        />
      )}
      {currentView === "approval" && (
        <ApprovalPage
          receivers={pendingReceivers}
          donors={pendingDonors}
          onApprove={handleApproval}
          onDeny={handleDenial}
          onBack={() => setCurrentView("home")}
          loading={loading}
        />
      )}
      {currentView === "matching" && (
        <MatchingPage
          allReceivers={allReceivers}
          allDonors={allDonors}
          onNavigateToDistribution={handleProceedToDistribution}
        />
      )}
      {currentView === "distribution" && (
        <DonationDistributionPage
          receiver={selectedReceiver}
          donors={selectedDonors}
          onBack={() => setCurrentView("matching")}
          onConfirmMatch={handleConfirmMatch}
          loading={loading}
        />
      )}
    </div>
  );
}

// --- HOME PAGE COMPONENT ---
const HomePage = ({ onNavigateToApproval, onNavigateToMatching }) => {
  return (
    <div className="page-container">
      <h1>SEVA SAHYOG Admin Portal</h1>
      <div className="button-container">
        <button className="home-button" onClick={onNavigateToApproval}>
          APPROVAL
        </button>
        <button className="home-button" onClick={onNavigateToMatching}>
          MATCHING
        </button>
      </div>
    </div>
  );
};

// --- APPROVAL PAGE COMPONENT ---
const ApprovalPage = ({
  receivers,
  donors,
  onApprove,
  onDeny,
  onBack,
  loading,
}) => {
  const [category, setCategory] = useState("");

  const filteredReceivers = receivers.filter((r) => r.category === category);
  const filteredDonors = donors.filter((d) => d.category === category);

  return (
    <div className="page-container">
      <h2>Pending Approvals</h2>
      <div className="dropdown-container">
        <label htmlFor="donationCategory">Select Donation Category: </label>
        <select
          id="donationCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            -- Choose a category --
          </option>
          <option value="stationery">Stationery</option>
          <option value="clothing">Clothing</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
          <option value="toys">Toys</option>
          <option value="others">Others</option>
        </select>
      </div>

      {category && (
        <div className="columns-container">
          <div className="column">
            <h3>PENDING RECEIVERS</h3>
            {filteredReceivers.length > 0 ? (
              filteredReceivers.map((item) => (
                <div key={item.id} className="card approval-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image"
                  />
                  <p>
                    <strong>Receiver:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Item:</strong> {item.title}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                  <div className="card-actions">
                    <button
                      className="approve-btn"
                      onClick={() => onApprove(item.id, "receiver")}
                      disabled={loading}
                    >
                      APPROVE
                    </button>
                    <button
                      className="deny-btn"
                      onClick={() => onDeny(item.id, "receiver")}
                      disabled={loading}
                    >
                      DENY
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending receivers in this category.</p>
            )}
          </div>
          <div className="column">
            <h3>PENDING DONORS</h3>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((item) => (
                <div key={item.id} className="card approval-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image"
                  />
                  <p>
                    <strong>Donor:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Item:</strong> {item.title}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                  <div className="card-actions">
                    <button
                      className="approve-btn"
                      onClick={() => onApprove(item.id, "donor")}
                      disabled={loading}
                    >
                      APPROVE
                    </button>
                    <button
                      className="deny-btn"
                      onClick={() => onDeny(item.id, "donor")}
                      disabled={loading}
                    >
                      DENY
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending donors in this category.</p>
            )}
          </div>
        </div>
      )}
      <button className="action-button" onClick={onBack}>
        BACK TO HOME
      </button>
    </div>
  );
};

// --- MATCHING PAGE COMPONENT ---
const MatchingPage = ({
  allReceivers,
  allDonors,
  onNavigateToDistribution,
}) => {
  const [donationType, setDonationType] = useState("");
  const [filteredReceivers, setFilteredReceivers] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState(null);
  const [selectedDonorIds, setSelectedDonorIds] = useState([]);

  const showNextButton = selectedReceiverId && selectedDonorIds.length > 0;

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setDonationType(type);
    setFilteredReceivers(allReceivers.filter((r) => r.category === type));
    setFilteredDonors(allDonors.filter((d) => d.category === type));
    setSelectedReceiverId(null);
    setSelectedDonorIds([]);
  };

  const handleReceiverSelect = (id) => setSelectedReceiverId(id);

  const handleDonorSelect = (id) => {
    setSelectedDonorIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((donorId) => donorId !== id)
        : [...prevIds, id]
    );
  };

  const handleNextClick = () => {
    const receiver = allReceivers.find((r) => r.id === selectedReceiverId);
    const donors = allDonors.filter((d) => selectedDonorIds.includes(d.id));
    onNavigateToDistribution(receiver, donors);
  };

  return (
    <div className="page-container">
      <h2>Match Donations</h2>
      <div className="dropdown-container">
        <label htmlFor="donationType">Select Donation Type: </label>
        <select
          id="donationType"
          value={donationType}
          onChange={handleTypeChange}
        >
          <option value="" disabled>
            -- Choose a type --
          </option>
          <option value="stationery">Stationery</option>
          <option value="clothing">Clothing</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
          <option value="toys">Toys</option>
          <option value="others">Others</option>
        </select>
      </div>

      {donationType && (
        <div className="columns-container">
          <div className="column">
            <h3>RECEIVER</h3>
            {filteredReceivers.length > 0 ? (
              filteredReceivers.map((receiver) => (
                <div
                  key={receiver.id}
                  className={`card ${
                    selectedReceiverId === receiver.id
                      ? "selected-receiver"
                      : ""
                  }`}
                  onClick={() => handleReceiverSelect(receiver.id)}
                >
                  <strong>{receiver.name}</strong>
                  <p>
                    <strong>Item:</strong> {receiver.title}
                  </p>
                  <p>
                    <strong>Quantity Needed:</strong> {receiver.quantity}
                  </p>
                  <p>
                    <strong>Description:</strong> {receiver.description}
                  </p>
                </div>
              ))
            ) : (
              <p>No available receivers in this category.</p>
            )}
          </div>
          <div className="column">
            <h3>DONOR</h3>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className={`card ${
                    selectedDonorIds.includes(donor.id) ? "selected-donor" : ""
                  }`}
                  onClick={() => handleDonorSelect(donor.id)}
                >
                  <strong>{donor.name}</strong>
                  <p>
                    <strong>Item:</strong> {donor.title}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {donor.quantity}
                  </p>
                  <p>
                    <strong>Condition:</strong> {donor.condition}
                  </p>
                  <p>
                    <strong>Description:</strong> {donor.description}
                  </p>
                </div>
              ))
            ) : (
              <p>No available donors in this category.</p>
            )}
          </div>
        </div>
      )}

      {showNextButton && (
        <button className="action-button" onClick={handleNextClick}>
          NEXT
        </button>
      )}
    </div>
  );
};

// --- DISTRIBUTION PAGE COMPONENT ---
const DonationDistributionPage = ({
  receiver,
  donors,
  onBack,
  onConfirmMatch,
  loading,
}) => {
  const handleConfirmClick = () => {
    onConfirmMatch(receiver, donors);
  };

  return (
    <div className="page-container">
      <h2>DONATION DISTRIBUTION</h2>
      <div className="summary-section">
        <h3>Selected Receiver</h3>
        <div className="card summary-card">
          <strong>{receiver.name}</strong>
          <p>
            <strong>Item:</strong> {receiver.title}
          </p>
          <p>
            <strong>Quantity Needed:</strong> {receiver.quantity}
          </p>
          <p>
            <strong>Description:</strong> {receiver.description}
          </p>
        </div>
      </div>
      <div className="summary-section">
        <h3>Selected Donors</h3>
        {donors.map((donor) => (
          <div key={donor.id} className="card summary-card">
            <strong>{donor.name}</strong>
            <p>
              <strong>Item:</strong> {donor.title}
            </p>
            <p>
              <strong>Quantity:</strong> {donor.quantity}
            </p>
            <p>
              <strong>Condition:</strong> {donor.condition}
            </p>
            <p>
              <strong>Description:</strong> {donor.description}
            </p>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="action-button" onClick={onBack} disabled={loading}>
          BACK
        </button>
        <button
          className="action-button confirm-button"
          onClick={handleConfirmClick}
          disabled={loading}
        >
          {loading ? "CONFIRMING..." : "CONFIRM MATCH"}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;