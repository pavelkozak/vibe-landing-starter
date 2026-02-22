"use client";

import { useEffect } from "react";
import { trackLandingView } from "./tracking";

export function LandingTracker() {
  useEffect(() => {
    trackLandingView();
  }, []);
  return null;
}
