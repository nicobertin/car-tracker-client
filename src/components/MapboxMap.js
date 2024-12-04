import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxMap = () => {
  const [vehicles, setVehicles] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/show`);
        const data = await response.json();
        setVehicles(data);

        if (data.length > 0) {
          setViewport({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            zoom: 5,
          });
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.vehicle_id}
            latitude={vehicle.latitude}
            longitude={vehicle.longitude}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {vehicle.identifier}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MapboxMap;
