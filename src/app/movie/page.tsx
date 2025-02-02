import MovieList from "../../components/MovieList";
import { fetchGenres } from "../../utils/api";

export default async function Movies() {
  const genres = await fetchGenres();
  return <MovieList initialList="popular" genres={genres} />;
}
