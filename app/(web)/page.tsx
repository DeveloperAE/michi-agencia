import { Suspense } from "react";

import { Hero } from "@/components/hero/hero";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={null}>
        <Hero />
      </Suspense>
    </main>
  );
}
