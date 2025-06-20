import { useState } from "react";
import districtJson from "../../data/warehouses.json";
import CoverageMap from "./CoverageMap";

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = districtJson.find((d) =>
      d.district.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (match) {
      setSelectedDistrict(match);
    } else {
      alert("District not found");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold text-center text-[#03373d]">
        We are available in 64 districts
      </h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center gap-3 justify-center"
      >
        <input
          type="text"
          placeholder="Search district…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:max-w-xs"
        />
        <button className="btn btn-primary" type="submit">
          Go
        </button>
      </form>

      {/* Map component with props */}
      <CoverageMap
        districts={districtJson}
        selectedDistrict={selectedDistrict}
      />
    </div>
  );
};

export default Coverage;
