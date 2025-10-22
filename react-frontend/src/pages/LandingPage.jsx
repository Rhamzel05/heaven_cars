import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import FeatureCard from "../components/FeatureCard";
import CarCard from "../components/CarCard";
import SearchBar from "../components/Searchbar";
import '../App.css'

const LandingPage = ({ onExplore, onOrder }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const carSlides = [
        {
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
            title: "Elevate Your Drive",
            subtitle: "Premium Luxury Vehicles",
            description: "Experience uncompromising elegance with our curated collection of luxury automobiles, where every detail is crafted for perfection.",
            price: "Starting from $45,000",
            features: ["Premium Interiors", "Advanced Safety", "Smart Technology", "Handcrafted Details"],
            badge: "🏆 Luxury Collection",
            buttonText: "Explore Luxury"
        },
        {
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
            title: "Unleash Performance",
            subtitle: "Sports & Premium",
            description: "Feel the adrenaline with our high-performance sports models. Precision engineering meets breathtaking design for the ultimate driving experience.",
            price: "Performance from $52,000",
            features: ["High Performance", "Sport Suspension", "Premium Audio", "Racing Heritage"],
            badge: "🏎️ Sports Edition",
            buttonText: "Experience Power"
        },
        {
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
            title: "Adventure Awaits",
            subtitle: "SUV & Off-Road Masters",
            description: "Our premium SUVs combine rugged capability with luxurious comfort for your greatest adventures.",
            price: "Adventure from $38,500",
            features: ["Spacious Interior", "Terrain Management", "Premium Comfort"],
            badge: "🚙 Adventure Ready",
            buttonText: "Explore SUVs"
        },
        {
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
            title: "Family Elegant",
            subtitle: "Safe & Comfortable",
            description: "Good for family journeys with safety features, spacious interiors, and technology that keeps everyone comfortable and secure.",
            price: "Family from $32,000",
            features: ["Family-Friendly", "Smart Storage"],
            badge: "👨‍👩‍👧‍👦 Family First",
            buttonText: "View Family Cars"
        }
    ];

    // Stats for the hero section
    const heroStats = [
        { number: "24h", label: "Fast Delivery" },
        { number: "500+", label: "Premium Cars" },
        { number: "98%", label: "Happy Clients" },
        { number: "5★", label: "Rated Service" }
    ];

    // Car brands for horizontal scroll
    const carBrands = [
        {
            name: "Toyota",
            logo: "https://cdn.worldvectorlogo.com/logos/toyota-1.svg",
            models: "Camry, Corolla, RAV4"
        },
        {
            name: "Honda",
            logo: "https://cdn.worldvectorlogo.com/logos/honda-1.svg",
            models: "Civic, Accord, CR-V"
        },
        {
            name: "Ford",
            logo: "https://cdn.worldvectorlogo.com/logos/ford-8.svg",
            models: "Mustang, F-150, Explorer"
        },
        {
            name: "BMW",
            logo: "https://cdn.worldvectorlogo.com/logos/bmw-2020.svg",
            models: "X5, 3 Series, 5 Series"
        },
        {
            name: "Mercedes",
            logo: "https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg",
            models: "C-Class, E-Class, GLC"
        },
        {
            name: "Audi",
            logo: "https://cdn.worldvectorlogo.com/logos/audi-2.svg",
            models: "A4, Q5, Q7"
        },
        {
            name: "Tesla",
            logo: "https://cdn.worldvectorlogo.com/logos/tesla-motors-1.svg",
            models: "Model 3, Model S, Model Y"
        },
        {
            name: "Hyundai",
            logo: "https://cdn.worldvectorlogo.com/logos/hyundai-motor-company.svg",
            models: "Tucson, Santa Fe, Elantra"
        },
        {
            name: "Kia",
            logo: "https://cdn.worldvectorlogo.com/logos/kia-motors-1.svg",
            models: "Sorento, Sportage, Telluride"
        },
        {
            name: "Nissan",
            logo: "https://cdn.worldvectorlogo.com/logos/nissan-2.svg",
            models: "Altima, Rogue, Pathfinder"
        }
    ];

    // Features data
    const features = [
        {
            icon: "⚡",
            title: "High Performance",
            description: "Experience breathtaking acceleration and top-tier performance with our advanced engine technology."
        },
        {
            icon: "🌿",
            title: "Eco Friendly",
            description: "Drive with confidence knowing our vehicles are designed with sustainability in mind."
        },
        {
            icon: "🛡️",
            title: "Advance Safety",
            description: "Advanced safety features and crash protection systems for complete peace of mind."
        },
        {
            icon: "🔧",
            title: "Smart Technology",
            description: "Integrated AI systems and smart connectivity for a seamless driving experience."
        },
        {
            icon: "💺",
            title: "Luxury Comfort",
            description: "Premium interiors and ergonomic design for the ultimate comfort on every journey."
        },
        {
            icon: "💰",
            title: "Best Value",
            description: "Competitive pricing with exceptional quality and long-term reliability."
        }
    ];

    // Popular car models data for CarCard components
    const popularCars = [
        {
            id: 1,
            model: "Honda Civic 2024",
            image: "https://images.unsplash.com/photo-1707345512638-1d37f86e01e9?ixlib=rb-4.0.1&auto=format&fit=crop&w=400&q=80",
            description: "All-new Honda Civic with advanced safety features, sleek design, and excellent fuel economy.",
            price: "$24,500",
            originalPrice: "$26,800",
            type: "Sedan",
            features: ["Apple CarPlay", "Android Auto", "Lane Assist", "Bluetooth", "Backup Camera", "Keyless Entry"],
            mileage: "32 MPG City / 42 MPG Highway",
            fuelType: "Gasoline",
            transmission: "Automatic CVT",
            condition: "Brand New",
            isNew: true,
            certified: true
        },
        {
            id: 2,
            model: "Toyota Camry XSE",
            image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.1&auto=format&fit=crop&w=400&q=80",
            description: "Sporty and sophisticated, the Camry XSE offers dynamic handling and premium interior features.",
            price: "$31,000",
            type: "Sedan",
            features: ["Heated Seats", "Sunroof", "Navigation", "Premium Audio", "Leather Seats", "Dual Zone Climate"],
            mileage: "28 MPG City / 39 MPG Highway",
            fuelType: "Hybrid",
            transmission: "8-Speed Automatic",
            condition: "Brand New",
            isFeatured: true,
            lowMileage: true
        },
        {
            id: 3,
            model: "Ford Mustang GT",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.1&auto=format&fit=crop&w=400&q=80",
            description: "Experience raw power with the iconic Ford Mustang GT. 5.0L V8 engine delivering 450 horsepower.",
            price: "$42,000",
            originalPrice: "$45,500",
            type: "Sports Car",
            features: ["V8 Engine", "Sport Suspension", "Performance Brakes", "Racing Stripes", "Launch Control", "Sport Mode"],
            mileage: "15 MPG City / 25 MPG Highway",
            fuelType: "Premium Gasoline",
            transmission: "10-Speed Automatic",
            condition: "Brand New",
            isFeatured: true
        },
        {
            id: 4,
            model: "Tesla Model 3",
            image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.1&auto=format&fit=crop&w=400&q=80",
            description: "Fully electric with autopilot features. Zero emissions with incredible acceleration.",
            price: "$45,000",
            type: "Electric",
            features: ["Autopilot", "Supercharging", "Glass Roof", "Premium Interior", "Over-the-Air Updates", "App Control"],
            mileage: "134 MPGe",
            fuelType: "Electric",
            transmission: "Single-Speed",
            condition: "Brand New",
            isNew: true,
            certified: true,
            financing: "$599/mo for 72 months"
        }
    ];

    // Statistics data
    const stats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "50+", label: "Car Models" },
        { number: "15+", label: "Years Experience" },
        { number: "24/7", label: "Customer Support" }
    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carSlides.length);
        }, 6000);

        // Trigger animations
        setIsVisible(true);

        return () => clearInterval(slideInterval);
    }, []);

    const handleExploreClick = () => {
        if (onExplore) {
            onExplore();
        } else {
            console.log("Explore clicked");
            document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleOrderClick = (car = null) => {
        if (onOrder) {
            onOrder(car);
        } else {
            console.log("Order clicked", car);
        }
    };

    const handleTestDrive = () => {
        console.log("Schedule test drive");
    };

    const handleFeatureClick = (index) => {
        console.log(`Feature ${index} clicked`);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        console.log("Searching for:", term);
    };

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
        console.log("Filtering by:", filter);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full">
            {/* Enhanced Hero Section */}
            <section id="home" className="w-full relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                        <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
                    </div>
                </div>

                {/* Slides */}
                <div className="relative h-screen flex items-center">
                    {carSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-10'
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}

                    {/* Hero Content */}
                    <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Text Content */}
                            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                {/* Badge */}
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                    <span className="text-white text-sm font-semibold">
                                        {carSlides[currentSlide].badge}
                                    </span>
                                </div>

                                {/* Title & Subtitle */}
                                <div className="space-y-4">
                                    <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                                        {carSlides[currentSlide].title.split(' ').map((word, i) => (
                                            <span
                                                key={i}
                                                className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                                            >
                                                {word}
                                            </span>
                                        ))}
                                    </h1>
                                    <p className="text-2xl lg:text-3xl text-blue-200 font-light">
                                        {carSlides[currentSlide].subtitle}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                                    {carSlides[currentSlide].description}
                                </p>

                                {/* Price */}
                                <div className="flex items-center space-x-4">
                                    <div className="text-2xl font-bold text-green-400">
                                        {carSlides[currentSlide].price}
                                    </div>
                                    <div className="w-px h-8 bg-gray-400"></div>
                                    <div className="text-sm text-gray-300">
                                        Competitive Financing Available
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-3">
                                    {carSlides[currentSlide].features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                                        >
                                            <span className="text-green-400 text-lg">✓</span>
                                            <span className="text-white text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <PrimaryButton
                                        label={carSlides[currentSlide].buttonText}
                                        onClick={handleExploreClick}
                                        type="primary"
                                        className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                                    />
                                    <PrimaryButton
                                        label="Schedule Test Drive"
                                        onClick={handleTestDrive}
                                        type="outline"
                                        className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-gray-900"
                                    />
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/20">
                                    {heroStats.map((stat, index) => (
                                        <div key={index} className="text-center">
                                            <div className="text-2xl font-bold text-white mb-1">
                                                {stat.number}
                                            </div>
                                            <div className="text-xs text-gray-300 uppercase tracking-wide">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Elements - Car Display */}
                            <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                {/* Main Car Image */}
                                <div className="relative">
                                    <img
                                        src={carSlides[currentSlide].image}
                                        alt={carSlides[currentSlide].title}
                                        className="w-full max-w-2xl rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Floating Elements */}
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                                        🔥 Popular Choice
                                    </div>

                                    <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                        <div className="text-sm text-gray-600">Monthly Payment</div>
                                        <div className="text-xl font-bold text-gray-900">From $399/mo</div>
                                    </div>
                                </div>

                                {/* Background Decorative Elements */}
                                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                            </div>
                        </div>
                    </div>

                    {/* Slide Navigation */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="flex space-x-3">
                            {carSlides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentSlide
                                        ? 'bg-white scale-125 shadow-lg'
                                        : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 right-8 z-20">
                        <div className="flex flex-col items-center space-y-2 text-white/70">
                            <span className="text-sm rotate-90 whitespace-nowrap mb-12">Scroll to explore</span>
                            <div className="w-px h-16 bg-white/30">
                                <div className="w-px h-8 bg-white animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Section Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </section>

            {/* Moving Brands Section */}
            <section className="w-full py-16 bg-white border-y border-gray-200 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Top Elegant Brands</h3>
                        <p className="text-gray-600 mt-2">Partner with the world's leading automotive manufacturers</p>
                    </div>
                    <div className="relative">
                        <div className="flex animate-marquee space-x-16 whitespace-nowrap">
                            {[...carBrands, ...carBrands].map((brand, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center min-w-[140px] transform hover:scale-110 transition-transform duration-300 group"
                                >
                                    <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-50 rounded-full p-2 group-hover:bg-blue-50 transition-colors duration-300">
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="w-12 h-12 object-contain filter group-hover:brightness-110 transition-all duration-300"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                        <span className="text-2xl hidden">{brand.name.charAt(0)}</span>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
                                            {brand.name}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 max-w-[120px] truncate">
                                            {brand.models}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="w-full py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose AutoListing
                        </h2>
                        <p className="text-lg text-gray-600">
                            Trusted by thousands of satisfied customers worldwide
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search and Featured Cars Section */}
            <section id="models" className="w-full py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Explore Your Perfect Car
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Browse our curated selection of elegant vehicles
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={handleSearch}
                            selectedFilter={selectedFilter}
                            onFilterChange={handleFilter}
                        />
                    </div>

                    {/* Featured Cars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-12">
                        {popularCars.map((car) => (
                            <CarCard
                                key={car.id}
                                car={car}
                                onOrder={handleOrderClick}
                                onQuickView={(car) => console.log('Quick view:', car)}
                                onCompare={(car) => console.log('Compare:', car)}
                            />
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center">
                        <PrimaryButton
                            label="View All Vehicles"
                            onClick={handleExploreClick}
                            type="primary"
                            className="px-12 py-4 text-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Best Features
                        </h3>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore and discover the features that make our vehicles stand out from the competition
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                onClick={() => handleFeatureClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            

            {/* CTA Section */}
            <section className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-center py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Drive Your Dream Car?
                    </h3>
                    <p className="mb-10 text-xl text-blue-100 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have found their perfect vehicle with us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <PrimaryButton
                            label="Browse Inventory"
                            onClick={handleExploreClick}
                            type="secondary"
                        />
                        <PrimaryButton
                            label="Schedule Test Drive"
                            onClick={handleTestDrive}
                            type="outline"
                        />
                        <PrimaryButton
                            label="Contact Sales"
                            onClick={() => console.log('Contact sales')}
                            type="outline"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-gray-900 text-gray-400 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    C
                                </div>
                                <span className="text-white font-bold text-2xl">CarListing</span>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-md">
                                Your trusted partner for premium vehicles. We offer the best selection of cars with exceptional customer service.
                            </p>
                            <div className="flex space-x-4">
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                                    <span className="text-white">f</span>
                                </div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                                    <span className="text-white">t</span>
                                </div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                                    <span className="text-white">i</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#models" className="hover:text-white transition-colors">Models</a></li>
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li>📞 (555) 123-4567</li>
                                <li>✉️ info@carelite.com</li>
                                <li>📍 123 Auto Street, Car City</li>
                                <li>🕒 Mon-Sun: 9AM - 8PM</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-sm">
                            © 2025 CarListing Motors. All rights reserved. |
                            <a href="#" className="hover:text-white transition-colors mx-2">Privacy Policy</a> |
                            <a href="#" className="hover:text-white transition-colors mx-2">Terms of Service</a> |
                            <a href="#" className="hover:text-white transition-colors mx-2">Contact Us</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;