"use client";

import { useState, useEffect } from "react";
import {
  fetchMovies,
  type Movie,
  type MovieList as MovieListType,
  type PaginatedResponse,
} from "../../utils/api";
import MovieItem from "./MovieItem";
import Pagination from "./Pagination";
import FilterSidebar from "./FilterSidebar";

interface MovieListProps {
  initialList: MovieListType;
  genres: { [id: number]: string };
}

export default function MovieList({ initialList, genres }: MovieListProps) {
  const [activeList, setActiveList] = useState<MovieListType>(initialList);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      const response: PaginatedResponse<Movie> = await fetchMovies(
        activeList,
        currentPage
      );
      setMovies(response.results);
      setTotalPages(response.total_pages);
    };
    loadMovies();
  }, [activeList, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-3xl font-bold text-black">Popular Movies</h2>
        <div className="flex flex-wrap gap-2 sm:mt-4">
          <button
            className={`px-4 py-2 rounded-full ${
              activeList === "upcoming"
                ? "bg-[#032541] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setActiveList("upcoming");
              setCurrentPage(1);
            }}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeList === "popular"
                ? "bg-[#032541] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setActiveList("popular");
              setCurrentPage(1);
            }}
          >
            Popular
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeList === "top_rated"
                ? "bg-[#032541] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setActiveList("top_rated");
              setCurrentPage(1);
            }}
          >
            Top Rated
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar*/}
        <FilterSidebar genres={genres} />

        {/* Movie Cards */}
        <main className="lg:w-5/6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} genres={genres} />
            ))}
          </div>

          {/* Pagination  */}
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
