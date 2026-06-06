import { createFileRoute } from "@tanstack/react-router";
import { BookingEngineFeature } from "@/features/booking-engine/components/BookingEngineFeature";
import FeatureDisabled from "@/components/FeatureDisabled";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const Route = createFileRoute("/booking-engine")({
  head: () => ({ meta: [{ title: "Booking Engine — Retrod PMS" }] }),
  component: BookingEngineGuardedRoute,
});

function BookingEngineGuardedRoute() {
  const { featureEnabled } = useAuth();
  if (!featureEnabled("bookingEngine")) {
    return (
      <FeatureDisabled
        title="Booking Engine is not enabled"
        description="This tenant plan does not include Booking Engine. Enable it to accept direct bookings online."
      />
    );
  }
  return <BookingEngineFeature />;
}
