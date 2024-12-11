"use client";

import { useRef } from "react";
import { useMap } from "../../../hooks/useMap";

export function MapDriver() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  useMap(mapContainerRef);

  return <div className="h-full w-2/3" ref={mapContainerRef} />;
}
