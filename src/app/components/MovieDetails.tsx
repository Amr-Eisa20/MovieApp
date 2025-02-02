"use client";
import { useState } from "react";
import type { MovieDetails as MovieDetailsType, Credit } from "../../utils/api";
import { Play, Heart, Bookmark, Menu, Star, ChevronDown } from "lucide-react";
import TopBilledCast from "./TopBilledCast";

interface MovieDetailsProps {
  movie: MovieDetailsType;
  credits: Credit[];
}

export default function MovieDetails({ movie, credits }: MovieDetailsProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const menuItems = ["Overview", "Media", "Fandom", "Share"];

  return (
    <div>
      {/*  Navbar Menu Tabs */}
      <div className="text-center px-4 md:px-10 lg:px-20 py-4 flex flex-wrap justify-center gap-4 text-black text-sm sm:text-lg font-medium">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`relative flex items-center ${
              activeTab === item ? "text-black border-b-2 border-blue-500" : ""
            }`}
          >
            {item} <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 m-1 mt-2" />
          </button>
        ))}
      </div>

      {/* Movie Banner */}
      <div className="relative w-full h-[500px] sm:h-[400px] lg:h-[550px] xl:h-[500px]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="absolute inset-0 flex items-center px-4 sm:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 w-full items-center md:items-start">
            {/* Movie Poster - Hidden on Small Screens */}
            <div className="w-32 sm:w-40 md:w-56 lg:w-64 hidden md:block lg:block">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Movie Info */}
            <div className="text-white w-full max-w-4xl text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {movie.title}{" "}
                <span className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              </h1>

              <p className="text-gray-400 mt-2 flex flex-wrap justify-center md:justify-start items-center gap-2 text-xs sm:text-sm lg:text-lg">
                <span className="border border-gray-400 px-2 py-1 text-xs rounded">
                  R
                </span>
                {movie.release_date} •{" "}
                {movie.genres.map((g) => g.name).join(", ")} • {movie.runtime}m
              </p>

              {/* User Score & Actions */}
              <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 sm:gap-6 mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-black font-bold p-2 sm:p-3 rounded-full w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center text-lg sm:text-xl">
                    {Math.round(movie.vote_average * 10)}%
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    User Score
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 mt-2 sm:mt-0">
                  <div className="flex gap-2 sm:gap-4">
                    {[Menu, Heart, Bookmark, Star].map((Icon, index) => (
                      <button
                        key={index}
                        className="bg-[#032541] p-2 sm:p-3 rounded-full flex items-center justify-center"
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </button>
                    ))}
                  </div>

                  <button className="flex items-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Play Trailer</span>
                  </button>
                </div>
              </div>

              <h3 className="mt-4 text-lg sm:text-2xl font-bold">Overview</h3>
              <p className="text-gray-300 mt-2 text-sm sm:text-base">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Billed Cast */}
      <TopBilledCast credits={credits} movie={movie} />
    </div>
  );
}
