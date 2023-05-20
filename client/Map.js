import React, { useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({ location }) => {
  const mapContainerRef = useRef(null);
  let map = null;
  let marker = null;

  useEffect(() => {
    const mapOptions = {
      center: { lat: location.lat, lng: location.lng },
      zoom: 10,
    };

    map = new window.google.maps.Map(mapContainerRef.current, mapOptions);

    marker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
    });

    blinkMarker();
  }, [location]);

  const blinkMarker = () => {
    setInterval(() => {
      marker.setMap(null);
      setTimeout(() => {
        marker.setMap(map);
      }, 500);
    }, 1000);
  };

  return (
    <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
  );
};

export default Map;
