export type FeatureKey =
  | "channelManager"
  | "websiteBuilder"
  | "bookingEngine"
  | "revenueAi"
  | "masterData";

export type FeatureFlags = Record<FeatureKey, boolean>;

export interface PropertyEntitlements {
  property: string;
  features: Partial<FeatureFlags>;
}
