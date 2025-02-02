import { Suspense } from "react";
import { fetchMovieDetails, fetchMovieCredits } from "../../../utils/api";
import MovieDetails from "../../../components/MovieDetails";

type Props = {
  params: { id: string };
};

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movieId = Number.parseInt(id);

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
