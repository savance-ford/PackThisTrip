import type { LuggageType } from "@/lib/types";

export const LUGGAGE_OPTIONS: { value: LuggageType; label: string; description: string }[] = [
  { value: "carry-on", label: "Carry-on", description: "Optimized for compact packing and airport liquid rules." },
  { value: "checked", label: "Checked bag", description: "More space, fewer liquid restrictions." },
  { value: "both", label: "Both", description: "Useful for longer trips or family travel." }
];
