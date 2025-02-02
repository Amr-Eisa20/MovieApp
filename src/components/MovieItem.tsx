import Link from "next/link";
import { MoreVertical } from "lucide-react";

interface MovieItemProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };
  genres: { [id: number]: string };
}

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative transition-transform transform hover:scale-105">
        {/* Movie Poster */}
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-80 object-fill"
          />

          {/* More Options Button (Top Right) */}
          <button className="absolute top-2 right-2 bg-gray-900 bg-opacity-40 rounded-full p-2">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>

          {/* Circular Rating Badge */}
          <div className="absolute -bottom-4 left-2 bg-black bg-opacity-70 text-white flex items-center justify-center w-10 h-10 rounded-full border-4 border-green-400">
            <span className="text-xs font-bold">
              {Math.round(movie.vote_average * 10)}%
            </span>
          </div>
        </div>

        {/* Movie Title & Release Date */}
        <div className="p-4">
          <h2 className="text-lg font-bold truncate text-black">
            {movie.title}
          </h2>
          <p className="text-gray-500 text-sm">
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
