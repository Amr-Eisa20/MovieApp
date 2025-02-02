import { Suspense } from "react";
import { fetchMovieDetails, fetchMovieCredits } from "../../../utils/api";
import MovieDetails from "../../components/MovieDetails";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movieId = Number.parseInt(params?.id);
  const movieDetails = await fetchMovieDetails(movieId);
  const movieCredits = await fetchMovieCredits(movieId);

  return (
    <main className="">
      <Suspense fallback={<div>Loading...</div>}>
        <MovieDetails movie={movieDetails} credits={movieCredits} />
      </Suspense>
    </main>
  );
}
