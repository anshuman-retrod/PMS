import { createFileRoute } from "@tanstack/react-router";
import { HotelsFeature } from "@/features/hotels/components/HotelsFeature";

export const Route = createFileRoute("/hotels")({
  head: () => ({ meta: [{ title: "Hotels — Retrod PMS" }] }),
  component: HotelsFeature,
});
