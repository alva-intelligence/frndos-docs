import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

// Root membungkus seluruh app dan persist saat navigasi.
// Agentation hanya tampil di dev (NODE_ENV === "development") dan client-side
// (Docusaurus SSR; Agentation client/desktop-only). Di production build branch ini
// di-eliminate sebagai dead code sehingga package tidak ikut ke bundle.
export default function Root({ children }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "development" && (
        <BrowserOnly>
          {() => {
            const { Agentation } = require("agentation");
            return <Agentation endpoint="http://localhost:4747" />;
          }}
        </BrowserOnly>
      )}
    </>
  );
}
