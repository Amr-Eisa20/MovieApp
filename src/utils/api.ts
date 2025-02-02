const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type MovieList = "upcoming" | "popular" | "top_rated";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails {
  title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  genres: Genre[];
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  keywords: string[];
}

export interface Credit {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface PaginatedResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(
  list: MovieList,
  page = 1
): Promise<PaginatedResponse<Movie>> {
  const response = await fetch(
    `${API_BASE_URL}/movie/${list}?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return await response.json();
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const response = await fetch(
    `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return await response.json();
}

export async function fetchMovieCredits(id: number): Promise<Credit[]> {
  const response = await fetch(
    `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data?.cast?.slice(0, 10);
}

export async function fetchGenres(): Promise<{ [id: number]: string }> {
  const response = await fetch(
    `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return Object.fromEntries(
    data.genres.map((genre: { id: number; name: string }) => [
      genre.id,
      genre.name,
    ])
  );
}
