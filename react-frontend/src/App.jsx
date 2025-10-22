import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import CarListing from './pages/carListing';
import OrderPage from './pages/orderPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);

  const handleExplore = () => {
    setCurrentPage('listing');
  };

  const handleOrder = (car = null) => {
    setSelectedCar(car);
    setCurrentPage('order');
  };

  const handleHome = () => {
    setCurrentPage('home');
    setSelectedCar(null);
  };

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'listing':
        return <CarListing onOrder={handleOrder} onHome={handleHome} onExplore={handleExplore} />;
      case 'order':
        return <OrderPage car={selectedCar} onHome={handleHome} onExplore={handleExplore} />;
      case 'home':
      default:
        return <LandingPage onExplore={handleExplore} onOrder={handleOrder} onHome={handleHome} />;
    }
  };

  return (
    <div className="App">
      <Navbar
        onExplore={handleExplore}
        onOrder={() => handleOrder()}
        onHome={handleHome}
        currentPage={currentPage}
      />
      {renderPage()}
    </div>
  );
}

export default App;