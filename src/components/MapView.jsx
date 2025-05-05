import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 Fit the map specifically around Indonesia
function FitBounds({ geoData }) {
  const map = useMap();

  useEffect(() => {
    if (geoData) {
      const indonesiaBounds = [
        [-11.0, 94.0],  // Southwest corner
        [6.0, 141.0]    // Northeast corner
      ];
      map.fitBounds(indonesiaBounds);
    }
  }, [geoData, map]);

  return null;
}

export default function MapView() {
  const [geoData, setGeoData] = useState(null);
  const [isSatellite, setIsSatellite] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/geo/province")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GeoJSON data");
        }
        return response.json();
      })
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, []);

  return (
    <div className="min-w-2xl mx-auto p-4 rounded-lg shadow-lg bg-gray-50">
      <h2 className="text-center text-lg font-semibold mb-4">Indonesia Halal Map</h2>
      
      <button
        onClick={() => setIsSatellite(!isSatellite)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle to {isSatellite ? "Default" : "Satellite"} View
      </button>

      <div className="min-w-full aspect-[2/1]">
        <MapContainer
          center={[-2.5, 117.5]} // Initial center
          zoom={5}
          scrollWheelZoom={true}
          className="h-full min-w-full"
        >
          <TileLayer
            url={
              isSatellite
                ? "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {geoData && (
            <>
              <GeoJSON data={geoData} />
              <FitBounds geoData={geoData} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
