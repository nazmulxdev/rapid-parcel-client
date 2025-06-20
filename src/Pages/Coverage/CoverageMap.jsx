import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FlyToDistrict = ({ district }) => {
  const map = useMap();

  if (district) {
    map.flyTo([district.latitude, district.longitude], 14);
  }

  return null;
};

const CoverageMap = ({ districts, selectedDistrict }) => {
  return (
    <div className="px-4 md:px-16 w-full rounded-lg shadow overflow-hidden">
      <h1 className="font-bold text-2xl text-[#03373d] text-center mb-2">
        We deliver almost all over Bangladesh
      </h1>
      <div className="w-full h-[50rem]">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
          />

          {districts.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{district.district}</h3>
                  <p className="text-sm">{district.city}</p>
                  <p className="text-xs text-gray-600">
                    Covered: {district.covered_area.join(", ")}
                  </p>
                  <a
                    href={district.flowchart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    View Flowchart
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Auto zoom into searched district */}
          <FlyToDistrict district={selectedDistrict} />
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;
