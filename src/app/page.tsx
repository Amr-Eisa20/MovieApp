import { Suspense } from "react";
import Movies from "./movie/page";

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Movies />
    </Suspense>
  );
}
