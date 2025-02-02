"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function FilterSidebar({
  genres,
}: {
  genres: { [id: number]: string };
}) {
  const [filters, setFilters] = useState({
    sortBy: "most_popular",
    whereToWatch: 28,
    showMe: "everything",
    searchAvailability: false,
    searchRelease: false,
    fromDate: "",
    toDate: "",
    selectedGenres: [] as number[],
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  // Here I can handle filter but I only add this fun to know but it didn't work now
  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
  };

  return (
    <aside className="lg:w-1/6 w-full ">
      {/* Sorting Section */}
      <div className="mb-4 border-b pb-2  bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-sm font-semibold flex justify-between items-center cursor-pointer text-black">
          Sort <ChevronRight className="w-5 h-5" />
        </h3>
      </div>

      {/* Where to Watch */}
      <div className="mb-4 border-b pb-2  bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-sm font-semibold flex justify-between items-center cursor-pointer text-black">
          Where To Watch{" "}
          <span className="bg-gray-200 px-2 py-1 text-xs rounded text-black">
            {filters.whereToWatch}
          </span>
          <ChevronRight className="w-5 h-5" />
        </h3>
      </div>

      {/* Collapsible Filters */}
      <div className="border-b pb-2 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3
          className="text-lg font-semibold flex justify-between items-center cursor-pointer text-black"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          Filters{" "}
          <ChevronRight
            className={`w-5 h-5 transition-transform ${
              isFiltersOpen ? "rotate-90" : ""
            }`}
          />
        </h3>
        <hr className="my-2" />

        {isFiltersOpen && (
          <div className="space-y-3 mt-2">
            {/* Show Me */}
            <div>
              <h4 className="text-sm font-medium mb-1 text-black">Show Me</h4>
              <div className="space-y-1">
                {["everything", "not_seen", "seen"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 text-black text-xs"
                  >
                    <input
                      type="radio"
                      name="showMe"
                      value={option}
                      checked={filters.showMe === option}
                      onChange={() => handleFilterChange("showMe", option)}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-black">
                      {option === "everything"
                        ? "Everything"
                        : option === "not_seen"
                        ? "Movies I Haven’t Seen"
                        : "Movies I Have Seen"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <hr />

            {/* Availabilities */}
            <div>
              <h4 className="text-sm font-medium mb-1 text-black">
                Availabilities
              </h4>
              <label className="flex items-center space-x-2 text-black text-xs">
                <input
                  type="checkbox"
                  checked={filters.searchAvailability}
                  onChange={() =>
                    handleFilterChange(
                      "searchAvailability",
                      !filters.searchAvailability
                    )
                  }
                  className="form-checkbox text-blue-500"
                />
                <span className="text-black">Search all availabilities?</span>
              </label>
            </div>
            <hr />

            {/* Release Dates */}
            <div>
              <h4 className="text-sm font-medium mb-1 text-black">
                Release Dates
              </h4>
              <label className="flex items-center space-x-2 text-black">
                <input
                  type="checkbox"
                  checked={filters.searchRelease}
                  onChange={() =>
                    handleFilterChange("searchRelease", !filters.searchRelease)
                  }
                  className="form-checkbox text-blue-500"
                />
                <span className="text-black text-xs">Search all releases?</span>
              </label>
              <div className="flex space-x-2 mt-2">
                <input
                  type="date"
                  className="w-1/2 p-2 border rounded-md text-black text-xs"
                  value={filters.fromDate}
                  onChange={(e) =>
                    handleFilterChange("fromDate", e.target.value)
                  }
                />
                <input
                  type="date"
                  className="w-1/2 p-2 border rounded-md text-black text-xs"
                  value={filters.toDate}
                  onChange={(e) => handleFilterChange("toDate", e.target.value)}
                />
              </div>
            </div>
            <hr />

            {/* Genres */}
            <div>
              <h4 className="text-sm font-medium mb-1 text-black">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(genres).map(([id, name]) => (
                  <button
                    key={id}
                    className={`px-3 py-1 text-xs rounded-full ${
                      filters.selectedGenres.includes(Number(id))
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => {
                      const updatedGenres = filters.selectedGenres.includes(
                        Number(id)
                      )
                        ? filters.selectedGenres.filter((g) => g !== Number(id))
                        : [...filters.selectedGenres, Number(id)];
                      handleFilterChange("selectedGenres", updatedGenres);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
