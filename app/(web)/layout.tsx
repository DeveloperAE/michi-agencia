import { Suspense } from "react";

import { Header } from "@/components/header/header";

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
    </>
  );
}
