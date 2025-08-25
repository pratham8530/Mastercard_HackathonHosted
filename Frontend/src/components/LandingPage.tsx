import { useState } from 'react';
import LoginModal from './LoginModal';

import Navbar from './Navbar';

interface LandingPageProps {
  onLogin: (role: 'donor' | 'receiver' | 'admin') => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = (role: 'donor' | 'receiver' | 'admin') => {
    setIsLoginModalOpen(false);
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLoginClick={handleLoginClick} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">+</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Seva Sahayog Donation Portal
              </h1>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Seva Sahayog Foundation requires a dedicated portal to facilitate kind donations between givers (individuals, corporates, institutions) and receivers (NGOs, schools, hostels, old-age homes, community organizations). The platform should enable donors to list available items and receivers to post their requirements, ensuring seamless matching and transparent transactions without heavy manual coordination.
            </p>

            <button
              className="bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors uppercase tracking-wide"
              onClick={() => window.location.href = 'https://sevasahayog.org/'}
            >
              Read More
            </button>
          </div>

          {/* Right Column - Photo Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Row */}
              <div className="space-y-4">
                <div className="bg-gray-200 rounded-lg overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=225&fit=crop"
                    alt="Community activity"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=300&fit=crop"
                    alt="Educational support"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=300&fit=crop"
                    alt="Volunteer work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gray-200 rounded-lg overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=225&fit=crop"
                    alt="Community gathering"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-16 flex justify-center w-full">
          <div className="bg-white shadow-lg rounded-xl p-10 w-full text-center">
            <h2 className="text-3xl font-bold mb-4 text-yellow-500">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-8">
              Celebrating Humanity by bridging the gap between “Struggling humankind” and “Aspiring humankind.”
            </p>
            <h2 className="text-3xl font-bold mb-4 text-yellow-500">Our Mission</h2>
            <p className="text-lg text-gray-700">
              Our mission is to build a network of socially conscious people within India and around the world which will be a pool of resources with financial strength, knowledge, commitment, and an aim to impact three million lives by 2030.
            </p>
          </div>
        </div>
      </main>

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}