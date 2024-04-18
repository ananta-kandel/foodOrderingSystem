import React, { useEffect, useRef } from 'react';

const Map = () => {
const lat = 27.7143
const lng=  85.3096
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize Google Map
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng }, // Center coordinates (London)
      zoom: 15,
    });

    // Add marker for restaurant location
    new window.google.maps.Marker({
      position: { lat, lng },
      map: googleMap,
      title: 'Restaurant Location',
    });
  }, [lat, lng]);

  return <div className=' flex justify-center items-center h-[100vh]' ref={mapRef} style={{ width: '100%' }} />;
};

export default Map;
