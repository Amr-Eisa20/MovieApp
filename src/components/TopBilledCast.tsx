"use client";

import { useEffect, useMemo, useState } from "react";
import type { Credit } from "../utils/api";
import { ChevronRight, Facebook, Twitter, Instagram, Link } from "lucide-react";
import CastCarousel from "./CastCarousel.tsx";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetails {
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  keywords: string[];
  genres: Genre[];
}

interface TopBilledCastProps {
  credits: Credit[];
  movie: MovieDetails;
}

export default function TopBilledCast({ credits, movie }: TopBilledCastProps) {
  const [clientData, setClientData] = useState<{
    budget: string;
    revenue: string;
  } | null>(null);

  useEffect(() => {
    setClientData({
      budget: `$${movie.budget.toLocaleString()}`,
      revenue: `$${movie.revenue.toLocaleString()}`,
    });
  }, [movie.budget, movie.revenue]);

  const transformedCredits = useMemo(() => {
    return credits.map((credit) => ({
      id: credit.id,
      name: credit.name,
      character: credit.character,
      image: credit.profile_path
        ? `https://image.tmdb.org/t/p/w200${credit.profile_path}`
        : "/placeholder.png",
    }));
  }, [credits]);

  return (
    <div className="mt-10 px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
      <div className="lg:col-span-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Top Billed Cast</h2>
        {/* Cast Carousel */}
        <CastCarousel credits={transformedCredits} />
      </div>

      <div className="lg:col-span-4 bg-white rounded-lg shadow-md border border-gray-200 p-6">
        {/* Social Icons */}
        <div className="flex gap-4 mb-4">
          <Facebook className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
          <Twitter className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
          <Instagram className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
          <Link className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
        </div>

        {/* Movie Information */}
        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p className="text-black font-medium">{movie.status}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Original Language</p>
            <p className="text-black font-medium">
              {movie.original_language.toUpperCase()}
            </p>
          </div>
          {clientData ? (
            <>
              <div>
                <p className="text-gray-500 text-sm">Budget</p>
                <p className="text-black font-medium">{clientData.budget}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <p className="text-black font-medium">{clientData.revenue}</p>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
        </div>

        {/* 🔹 Keywords Section */}
        <div className="mt-6">
          <p className="text-gray-500 text-sm mb-2">Keywords</p>
          <div className="flex flex-wrap gap-2">
            {movie?.genres?.map((item) => (
              <span
                key={item.id}
                className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-md"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
