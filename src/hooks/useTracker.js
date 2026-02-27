// src/hooks/useTracker.js
// Call this hook once in App.jsx — fires once per browser session

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useTracker() {
  const location = useLocation();

  useEffect(() => {
    // Fire on every route change
    const track = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: location.pathname,
            referrer: document.referrer || "",
          }),
        });
      } catch {
        // Silently ignore — tracking should never break the app
      }
    };

    track();
  }, [location.pathname]); // re-fires on each page navigation
}