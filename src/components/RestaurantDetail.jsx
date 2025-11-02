import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { restaurants } from '../data';

const LOGO_SIZE = 60;

const RestaurantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const restaurant = restaurants.find(r => r.id === parseInt(id));

    const [logoPosition, setLogoPosition] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const logoRef = useRef(null);
    const containerRef = useRef(null);
    const imageContainerRef = useRef(null);

    if (!restaurant) {
        return <div className="p-4">Restaurant not found.</div>;
    }

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const containerHeight = containerRef.current.offsetHeight;
            setLogoPosition({
                x: containerWidth - LOGO_SIZE - 16,
                y: containerHeight - LOGO_SIZE - 16,
            });
        }
    }, [restaurant.imageUrl]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        
        let newX = e.clientX - containerRect.left - (LOGO_SIZE / 2);
        let newY = e.clientY - containerRect.top - (LOGO_SIZE / 2);

        newX = Math.max(0, Math.min(newX, containerRect.width - LOGO_SIZE));
        newY = Math.max(0, Math.min(newY, containerRect.height - LOGO_SIZE));

        setLogoPosition({ x: newX, y: newY });
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleShare = async () => {
        const canvas = await html2canvas(imageContainerRef.current, {
            allowTaint: true,
            useCORS: true,
            backgroundColor: '#ffffff',
            scale: 2, // Higher quality
            logging: false,
            windowWidth: imageContainerRef.current.scrollWidth,
            windowHeight: imageContainerRef.current.scrollHeight,
        });
        
        const ctx = canvas.getContext('2d');
        const roundedCanvas = document.createElement('canvas');
        roundedCanvas.width = canvas.width;
        roundedCanvas.height = canvas.height;
        const roundedCtx = roundedCanvas.getContext('2d');
        
        const borderRadius = 24 * 2;
        roundedCtx.beginPath();
        roundedCtx.moveTo(borderRadius, 0);
        roundedCtx.lineTo(roundedCanvas.width - borderRadius, 0);
        roundedCtx.quadraticCurveTo(roundedCanvas.width, 0, roundedCanvas.width, borderRadius);
        roundedCtx.lineTo(roundedCanvas.width, roundedCanvas.height - borderRadius);
        roundedCtx.quadraticCurveTo(roundedCanvas.width, roundedCanvas.height, roundedCanvas.width - borderRadius, roundedCanvas.height);
        roundedCtx.lineTo(borderRadius, roundedCanvas.height);
        roundedCtx.quadraticCurveTo(0, roundedCanvas.height, 0, roundedCanvas.height - borderRadius);
        roundedCtx.lineTo(0, borderRadius);
        roundedCtx.quadraticCurveTo(0, 0, borderRadius, 0);
        roundedCtx.closePath();
        roundedCtx.clip();
        
        roundedCtx.drawImage(canvas, 0, 0);

        roundedCanvas.toBlob(async (blob) => {
            if (!blob) {
                alert("Failed to generate image for sharing.");
                return;
            }
            
            const file = new File([blob], 'fastor_cake.png', { type: blob.type });
            
            if (navigator.share && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: `Check out ${restaurant.name} on Fastor!`,
                        text: restaurant.description,
                    });
                } catch (error) {
                    console.error('Error sharing:', error);
                    alert('Sharing failed or was cancelled.');
                }
            } else {
                alert("Web Share API is not supported in this browser or context. Please try on a mobile browser or PWA install.");
            }
        }, 'image/png');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <main className="flex flex-col items-center p-4 overflow-y-auto flex-grow">
                <div className="relative w-full max-w-sm mb-8">
                
                    <button 
                        onClick={() => navigate(-1)} 
                        className="absolute top-4 left-4 p-2 z-30"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                    </button>
                    
              
                    <div 
                        ref={imageContainerRef}
                        className="relative w-full aspect-square bg-white shadow-xl rounded-xl overflow-hidden"
                    >
                        <div ref={containerRef} className="w-full h-full relative">
                            
                            <img 
                                src={restaurant.imageUrl} 
                                alt={restaurant.name} 
                                className="w-full h-full object-cover"
                                crossOrigin="anonymous" 
                                onError={(e) => e.target.src = 'https://via.placeholder.com/400'}
                            />
                            
                
                            {logoPosition && (
                                <img 
                                    ref={logoRef}
                                    src="/fastorLogo.png"
                                    alt="Fastor Logo"
                                    style={{ 
                                        left: logoPosition.x, 
                                    top: logoPosition.y, 
                                    width: LOGO_SIZE, 
                                    height: LOGO_SIZE,
                                    cursor: 'grab',
                                    zIndex: 10,
                                }}
                                className="absolute rounded-full shadow-lg shadow-gradient-blue"
                                onMouseDown={handleMouseDown}
                            
                                onTouchStart={(e) => {
                                
                                    e.clientX = e.touches[0].clientX;
                                    e.clientY = e.touches[0].clientY;
                                    handleMouseDown(e);
                                }}
                                onTouchMove={(e) => {
                                
                                e.clientX = e.touches[0].clientX;
                                e.clientY = e.touches[0].clientY;
                                handleMouseMove(e);
                            }}
                            onTouchEnd={handleMouseUp}
                        />
                        )}
                    </div>
                </div>
                </div>

                
                <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">{restaurant.name}</h2>
                            <p className="text-sm text-gray-500">{restaurant.location}</p>
                        </div>
                        <div className="flex items-center text-gray-500 px-2 py-1 rounded-md">
                            <span className="text-sm font-semibold">⭐ {restaurant.rating}</span>
                        </div>
                    </div>
                    <p className="text-gray-600">{restaurant.description}</p>
                    <p className="mt-3 text-sm text-red-500 font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M17.817 16.063V14.721C17.817 14.3887 17.949 14.07 18.184 13.835L19.133 12.886C19.6223 12.3967 19.6223 11.6033 19.133 11.114L18.184 10.165C17.949 9.93001 17.817 9.61131 17.817 9.27899V7.93599C17.817 7.24398 17.256 6.68299 16.564 6.68299H15.221C14.8887 6.68299 14.57 6.55097 14.335 6.31599L13.386 5.36699C12.8967 4.87767 12.1033 4.87767 11.614 5.36699L10.665 6.31599C10.43 6.55097 10.1113 6.68299 9.77899 6.68299H8.43599C8.1035 6.68299 7.78464 6.81514 7.54963 7.05034C7.31462 7.28554 7.18273 7.6045 7.18299 7.93699V9.27899C7.18299 9.61131 7.05097 9.93001 6.81599 10.165L5.86699 11.114C5.37767 11.6033 5.37767 12.3967 5.86699 12.886L6.81599 13.835C7.05097 14.07 7.18299 14.3887 7.18299 14.721V16.063C7.18299 16.755 7.74398 17.316 8.43599 17.316H9.77899C10.1113 17.316 10.43 17.448 10.665 17.683L11.614 18.632C12.1033 19.1213 12.8967 19.1213 13.386 18.632L14.335 17.683C14.57 17.448 14.8887 17.316 15.221 17.316H16.563C16.8955 17.3163 17.2144 17.1844 17.4496 16.9493C17.6848 16.7143 17.817 16.3955 17.817 16.063Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.78202 10.641C9.50715 10.3662 9.42492 9.95286 9.57366 9.59375C9.7224 9.23464 10.0728 9.00049 10.4615 9.00049C10.8502 9.00049 11.2006 9.23464 11.3494 9.59375C11.4981 9.95286 11.4159 10.3662 11.141 10.641C10.7657 11.0163 10.1573 11.0163 9.78202 10.641Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.859 14.718C13.5841 14.4431 13.5019 14.0298 13.6506 13.6707C13.7994 13.3115 14.1498 13.0774 14.5385 13.0774C14.9272 13.0774 15.2776 13.3115 15.4263 13.6707C15.5751 14.0298 15.4928 14.4431 15.218 14.718C14.8427 15.0932 14.2343 15.0932 13.859 14.718Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M15.218 9.28101L9.78101 14.719" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        4 Offers Trending
                    </p>
                </div>
            </main>

            <div className="p-4 bg-white border-t border-gray-200">
                <button
                    onClick={handleShare}
                    className="w-full py-3 text-white font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 transition duration-150 shadow-lg"
                >
                    Share Image with Fastor Logo
                </button>
            </div>
        </div>
    );
};

export default RestaurantDetail;