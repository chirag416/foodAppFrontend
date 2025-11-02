import React from 'react';
import { useNavigate } from 'react-router-dom';
import offerIcon from '../assets/offer.svg';
import walletIcon from '../assets/wallet.svg';
import userShield from '../assets/userShield.svg';
import { restaurants } from '../data';

const yourTaste = [
    { name: "Nik Baker's", imageUrl: "/nik_bakers.png", isPopular: false },
    { name: "It's Bake", imageUrl: "/its_bake.png", isPopular: false },
    { name: "Cakery", imageUrl: "/cakery.png", isPopular: false },
];

const RestaurantCard = ({ restaurant, navigate }) => (
    <div 
        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        className="flex items-start p-4 bg-white rounded-xl shadow-sm mb-4 cursor-pointer"
    >
        <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name} 
            className="w-20 h-20 object-cover rounded-xl mr-4"
            onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
        />
        <div className="flex-1">
            <h3 className="text-lg font-bold">{restaurant.name}</h3>
            <p className="text-sm text-gray-500">{restaurant.category}</p>
            <p className="text-xs text-gray-400">{restaurant.location}</p>
            <div className="flex justify-between items-center mt-1 text-sm">
                <span className="flex items-center text-red-500 font-semibold text-xs">
                    <svg className="w-4 h-4 mr-1" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M17.817 16.063V14.721C17.817 14.3887 17.949 14.07 18.184 13.835L19.133 12.886C19.6223 12.3967 19.6223 11.6033 19.133 11.114L18.184 10.165C17.949 9.93001 17.817 9.61131 17.817 9.27899V7.93599C17.817 7.24398 17.256 6.68299 16.564 6.68299H15.221C14.8887 6.68299 14.57 6.55097 14.335 6.31599L13.386 5.36699C12.8967 4.87767 12.1033 4.87767 11.614 5.36699L10.665 6.31599C10.43 6.55097 10.1113 6.68299 9.77899 6.68299H8.43599C8.1035 6.68299 7.78464 6.81514 7.54963 7.05034C7.31462 7.28554 7.18273 7.6045 7.18299 7.93699V9.27899C7.18299 9.61131 7.05097 9.93001 6.81599 10.165L5.86699 11.114C5.37767 11.6033 5.37767 12.3967 5.86699 12.886L6.81599 13.835C7.05097 14.07 7.18299 14.3887 7.18299 14.721V16.063C7.18299 16.755 7.74398 17.316 8.43599 17.316H9.77899C10.1113 17.316 10.43 17.448 10.665 17.683L11.614 18.632C12.1033 19.1213 12.8967 19.1213 13.386 18.632L14.335 17.683C14.57 17.448 14.8887 17.316 15.221 17.316H16.563C16.8955 17.3163 17.2144 17.1844 17.4496 16.9493C17.6848 16.7143 17.817 16.3955 17.817 16.063Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.78202 10.641C9.50715 10.3662 9.42492 9.95286 9.57366 9.59375C9.7224 9.23464 10.0728 9.00049 10.4615 9.00049C10.8502 9.00049 11.2006 9.23464 11.3494 9.59375C11.4981 9.95286 11.4159 10.3662 11.141 10.641C10.7657 11.0163 10.1573 11.0163 9.78202 10.641Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.859 14.718C13.5841 14.4431 13.5019 14.0298 13.6506 13.6707C13.7994 13.3115 14.1498 13.0774 14.5385 13.0774C14.9272 13.0774 15.2776 13.3115 15.4263 13.6707C15.5751 14.0298 15.4928 14.4431 15.218 14.718C14.8427 15.0932 14.2343 15.0932 13.859 14.718Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M15.218 9.28101L9.78101 14.719" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {restaurant.offers}
                </span>
            </div>
            <div className="flex justify-between items-start mt-2">
                <div className="flex flex-col">
                    <span className="flex items-center text-sm font-semibold text-gray-500">
                        ⭐ {restaurant.rating}
                    </span>
                    <span className="text-xs text-gray-400">Popular</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500 font-bold text-base">
                        ${restaurant.priceForTwo}
                    </span>
                    <span className="text-xs text-gray-400">Cost for two</span>
                </div>
            </div>
        </div>
    </div>
);

const Home = () => {
    const navigate = useNavigate();

    const nearbyRestaurants = restaurants.filter(r => r.id !== 1);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <header className="mb-6">
                <div className="mb-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-sm flex gap-1 text-gray-500 items-center">
                        Pre Order From 
                        <img src={userShield} alt="user" className="w-4 h-4 ml-1 icon-gray" />
                    </div>
                    <div className="mt-1">
                        <span className="inline-flex items-center text-gray-800 font-semibold text-lg">
                            Cannaught Place
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-start">
                    <div className="flex flex-1 mr-4">
                        <div className="bg-gray-100 p-4 rounded-xl shadow-sm w-full">
                            <span className="text-3xl font-bold text-gray-800">Karan</span>
                            <p className="text-lg text-gray-600 mt-1">Let's explore this evening</p>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <div className="flex flex-col items-center">
                            <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-gradient-red">
                                <img src={offerIcon} alt="offers" className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-sm text-gray-700 mt-1 font-medium">Offers</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-gradient-blue">
                                <img src={walletIcon} alt="wallet" className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-sm text-gray-700 mt-1 font-medium">Wallet</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold">Your taste</h2>
                    <button className="text-sm text-red-500 font-semibold">see all &gt;</button>
                </div>
                <div className="flex overflow-x-scroll space-x-4 pb-2 scrollbar-hide">
                    {yourTaste.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-32 h-32 relative rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/128'}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                                <p className="text-white text-sm font-semibold">{item.name}</p>
                                <p className="text-white text-xs">
                                    <span className="block">Connaught Place</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section
                className="mb-8 relative rounded-xl overflow-hidden shadow-lg h-48"
                style={{ backgroundImage: `url('/banner.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="relative z-10 inset-0 p-6 flex flex-col justify-center h-full">
                    <h2 className="text-2xl font-bold text-white mb-2 leading-snug">VEGGIE FRIENDLY EATERIES</h2>
                    <button className="w-fit px-4 py-2 text-sm font-semibold rounded-lg bg-green-700 text-white hover:bg-green-800 transition">TRY NOW</button>
                </div>

                <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-10">
                    <div className="w-2 h-2 rounded-full bg-white opacity-70"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-30"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-30"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-30"></div>
                </div>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-4">Popular Ones</h2>
                <div className="space-y-4">
                    {restaurants.map(r => (
                        <RestaurantCard key={r.id} restaurant={r} navigate={navigate} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;