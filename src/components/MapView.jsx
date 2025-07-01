import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FitBounds({ geoData }) {
  const map = useMap();
  useEffect(() => {
    if (geoData) {
      const indonesiaBounds = [
        [-11.0, 94.0], // Southwest corner
        [6.0, 141.0],  // Northeast corner
      ];
      map.fitBounds(indonesiaBounds);
    }
  }, [geoData, map]);
  return null;
}

export default function MapView() {
  const [geoData, setGeoData] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  // Always fetch heatmap GeoJSON
  useEffect(() => {
    fetch("http://localhost:8000/geo/heatmap")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GeoJSON data");
        }
        return response.json();
      })
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, []);

  // Style function for heatmap layer
  const styleHeatmap = (feature) => {
    const intensity = feature.properties.intensity || 0; // Default to 0 if no intensity
    let fillColor = "#DFEDA0"; // Default color
    if (intensity > 1000) fillColor = "#FED976";
    if (intensity > 2000) fillColor = "#FEB24C";
    if (intensity > 3000) fillColor = "#FD8D3C";
    if (intensity > 4000) fillColor = "#FC4E2A";
    if (intensity > 5000) fillColor = "#E31A1C";
    if (intensity > 6000) fillColor = "#BD0026";
    if (intensity > 7000) fillColor = "#800026";
    return {
      fillColor,
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  // Default style (not used in this configuration)
  const styleDefault = () => ({
    fillColor: "#cccccc",
    weight: 1,
    opacity: 1,
    color: "white",
    fillOpacity: 0.7,
  });

  // onEachFeature to add popup data including certificate count
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPopupInfo({
          name: feature.properties.PROVINSI || "Wilayah",
          certificateTotal: feature.properties.intensity || "N/A",
          lat,
          lng,
        });
      },
    });
  };

  return (
    <div className="h-fit w-full bg-gray-100 p-2 rounded-lg shadow-lg border-2 border-gray-300">
      <div className="w-full aspect-[3/1]">
        <MapContainer center={[-2.5, 117.5]} zoom={5} scrollWheelZoom={true} className="h-full w-full">
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Default">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles © Esri"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          {geoData && (
            <>
              <GeoJSON
                data={geoData}
                onEachFeature={onEachFeature}
                style={styleHeatmap}
              />
              <FitBounds geoData={geoData} />
            </>
          )}
          {popupInfo && (
            <Popup position={[popupInfo.lat, popupInfo.lng]}>
              <div>
                <h2 className="font-bold text-lg">{popupInfo.name}</h2>
                <p>Total Certificate: {popupInfo.certificateTotal}</p>
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
