import React, { useState, useEffect } from 'react';
import { carData } from '../data/carData.js';
import SearchBar from '../components/Searchbar';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import PrimaryButton from '../components/PrimaryButton';

const CarListing = ({ onOrder, onHome, onExplore }) => {
  const [cars, setCars] = useState(carData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const carsPerPage = 6;

  // Filter and sort cars
  useEffect(() => {
    setLoading(true);

    let filteredCars = [...carData];

    // Apply search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filteredCars = filteredCars.filter(
        (car) =>
          car.model.toLowerCase().includes(q) ||
          car.description.toLowerCase().includes(q) ||
          car.type.toLowerCase().includes(q) ||
          car.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Apply type filter
    if (selectedFilter !== 'all') {
      filteredCars = filteredCars.filter((car) => car.type === selectedFilter);
    }

    // Apply sorting
    filteredCars = sortCars(filteredCars, sortBy);

    // Simulate loading delay for better UX
    setTimeout(() => {
      setCars(filteredCars);
      setCurrentPage(1);
      setLoading(false);
    }, 300);
  }, [searchTerm, selectedFilter, sortBy]);

  // Sort function
  const sortCars = (carsList, sortType) => {
    const sortedCars = [...carsList];
    switch (sortType) {
      case 'price-low':
        return sortedCars.sort(
          (a, b) =>
            parseFloat(a.price.replace('$', '').replace(',', '')) -
            parseFloat(b.price.replace('$', '').replace(',', ''))
        );
      case 'price-high':
        return sortedCars.sort(
          (a, b) =>
            parseFloat(b.price.replace('$', '').replace(',', '')) -
            parseFloat(a.price.replace('$', '').replace(',', ''))
        );
      case 'name':
        return sortedCars.sort((a, b) => a.model.localeCompare(b.model));
      case 'featured':
      default:
        return sortedCars;
    }
  };

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.max(1, Math.ceil(cars.length / carsPerPage));

  const handleOrderClick = (car) => {
    console.log('Ordering car:', car);
    if (onOrder) onOrder(car);
  };

  const handleQuickView = (car) => {
    console.log('Quick view:', car);
    // modal could be implemented here
  };

  const handleCompare = (car) => {
    console.log('Compare car:', car);
    // compare functionality
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('all');
    setSortBy('featured');
  };

  const carTypes = ['all', ...new Set(carData.map((car) => car.type))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
              Explore Our Premium Collection
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect vehicle that matches your lifestyle and budget from our carefully curated selection.
          </p>
        </div>

        {/* Stats Bar (glass card) */}
        <div className="backdrop-blur-sm bg-white/60 dark:bg-opacity-10 rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-sky-600">{carData.length}</div>
              <div className="text-sm text-gray-600">Total Vehicles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{carTypes.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                ${Math.min(...carData.map((car) => parseFloat(car.price.replace('$', '').replace(',', '')))).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Starting From</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{cars.length}</div>
              <div className="text-sm text-gray-600">Available Now</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 w-full">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-stretch">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>

              {(searchTerm || selectedFilter !== 'all') && (
                <PrimaryButton
                  label="Clear Filters"
                  onClick={clearFilters}
                  type="outline"
                  className="whitespace-nowrap px-4 py-3 rounded-xl border"
                />
              )}
            </div>
          </div>

          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {carTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedFilter === type
                    ? 'bg-sky-600 text-white shadow-lg transform -translate-y-0.5'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div>
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{cars.length}</span> car{cars.length !== 1 ? 's' : ''}
              {selectedFilter !== 'all' && <span className="text-sky-600"> in <strong>{selectedFilter}</strong></span>}
              {searchTerm && <span className="text-green-600"> matching "<strong>{searchTerm}</strong>"</span>}
            </p>
          </div>

          {totalPages > 1 && (
            <div className="text-sm text-gray-500 mt-2 sm:mt-0">
              Page <span className="font-bold text-gray-900">{currentPage}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-gray-200 border-t-sky-500"></div>
            <p className="mt-4 text-gray-600">Finding your perfect car...</p>
          </div>
        )}

        {/* Car Grid */}
        {!loading && currentCars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {currentCars.map((car) => (
                <div
                  key={car.id}
                  className="rounded-2xl bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  {/* wrap CarCard so we can inject consistent padding/glass look */}
                  <div className="p-4">
                    <CarCard
                      car={car}
                      onOrder={handleOrderClick}
                      onQuickView={handleQuickView}
                      onCompare={handleCompare}
                      onExplore={onExplore}
                      onHome={onHome}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </>
        ) : (
          !loading && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-7xl mb-6">🚗</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No cars found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">We couldn't find any vehicles matching your criteria.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton
                  label="Clear Filters & Browse All"
                  onClick={clearFilters}
                  type="primary"
                  className="px-6 py-3 rounded-xl"
                />
                <PrimaryButton label="Back to Home" onClick={onHome} type="outline" className="px-6 py-3 rounded-xl" />
              </div>
            </div>
          )
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl p-8 text-center text-white mt-12 shadow-md">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
            Our inventory is constantly updated. Contact us and we'll help you find your dream car.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton
              label="Contact Sales Team"
              onClick={() => console.log('Contact sales')}
              type="secondary"
              className="px-6 py-3 rounded-xl"
            />
            <PrimaryButton
              label="Schedule Test Drive"
              onClick={() => console.log('Schedule test drive')}
              type="outline"
              className="px-6 py-3 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
