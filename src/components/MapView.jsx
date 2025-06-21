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
        [6.0, 141.0], // Northeast corner
      ];
      map.fitBounds(indonesiaBounds);
    }
  }, [geoData, map]);

  return null;
}

export default function MapView() {
  const [layerType, setLayerType] = useState("region"); // "region" or "province"
  const [geoData, setGeoData] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    const url =
      layerType === "region"
        ? "http://localhost:8000/geo/region"
        : "http://localhost:8000/geo/province";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GeoJSON data");
        }
        return response.json();
      })
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, [layerType]);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPopupInfo({
          name:
            feature.properties.WADMKK ||
            feature.properties.PROVINSI ||
            "Wilayah",
          lat,
          lng,
        });
      },
    });
  };

  return (
    <div className="h-fit w-full bg-gray-100 mt-5 p-2 rounded-lg shadow-lg border-2 border-gray-300 ">
      <div className="flex justify-end mb-2">
        <button
          className={`px-4 py-1 rounded-l hover:cursor-pointer ${
            layerType === "region"
              ? "bg-[#670075] text-white"
              : "bg-white text-[#670075] border"
          }`}
          onClick={() => setLayerType("region")}>
          Provinsi
        </button>
        <button
          className={`px-4 py-1 rounded-r hover:cursor-pointer ${
            layerType === "province"
              ? "bg-[#670075] text-white"
              : "bg-white text-[#670075] border"
          }`}
          onClick={() => setLayerType("province")}>
          Kabupaten/Kota
        </button>
      </div>
      <div className="w-full aspect-[3/1]">
        <MapContainer
          center={[-2.5, 117.5]}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full">
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
                attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          {geoData && (
            <>
              <GeoJSON
                key={layerType}
                data={geoData}
                onEachFeature={onEachFeature}
              />
              <FitBounds geoData={geoData} />
            </>
          )}
          {popupInfo && (
            <Popup position={[popupInfo.lat, popupInfo.lng]}>
              <div>
                <h2 className="font-bold text-lg">{popupInfo.name}</h2>
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
