"use client";

import { useMemo, useState } from "react";
import { ACTIVITY_OPTIONS } from "@/data/activityModules";
import { DESTINATIONS } from "@/data/destinations";
import { LUGGAGE_OPTIONS } from "@/data/luggageRules";
import { TRAVELER_OPTIONS } from "@/data/travelerModules";
import type { LuggageType, TravelerType, TripConfig, TripType } from "@/lib/types";
import { Button } from "@/components/Button";

type PackingFormProps = {
  initialConfig: TripConfig | null;
  onSubmit: (config: TripConfig) => void;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function PackingForm({ initialConfig, onSubmit }: PackingFormProps) {
  const firstDestination = DESTINATIONS[0];
  const [destinationSlug, setDestinationSlug] = useState(initialConfig?.destinationSlug ?? firstDestination.slug);
  const selectedDestination = useMemo(
    () => DESTINATIONS.find((destination) => destination.slug === destinationSlug) ?? firstDestination,
    [destinationSlug, firstDestination]
  );
  const [month, setMonth] = useState(initialConfig?.month ?? MONTHS[new Date().getMonth()]);
  const [durationDays, setDurationDays] = useState(initialConfig?.durationDays ?? 5);
  const [luggageType, setLuggageType] = useState<LuggageType>(initialConfig?.luggageType ?? "carry-on");
  const [travelerType, setTravelerType] = useState<TravelerType>(initialConfig?.travelerType ?? "solo");
  const [tripTypes, setTripTypes] = useState<TripType[]>(initialConfig?.tripTypes ?? ["city"]);
  const [hasLaundry, setHasLaundry] = useState(initialConfig?.hasLaundry ?? false);
  const [packLight, setPackLight] = useState(initialConfig?.packLight ?? false);
  const [rainExpected, setRainExpected] = useState(initialConfig?.rainExpected ?? selectedDestination.climateTags.includes("rain"));
  const [coldWeather, setColdWeather] = useState(initialConfig?.coldWeather ?? selectedDestination.climateTags.some((tag) => tag.includes("cold") || tag === "cool"));
  const [hotWeather, setHotWeather] = useState(initialConfig?.hotWeather ?? selectedDestination.climateTags.some((tag) => tag.includes("hot") || tag === "tropical"));
  const [isInternational, setIsInternational] = useState(initialConfig?.isInternational ?? selectedDestination.isInternationalDefault);
  const [error, setError] = useState<string | null>(null);

  function updateDestination(slug: string) {
    const nextDestination = DESTINATIONS.find((destination) => destination.slug === slug) ?? firstDestination;
    setDestinationSlug(slug);
    setIsInternational(nextDestination.isInternationalDefault);
    setRainExpected(nextDestination.climateTags.includes("rain"));
    setColdWeather(nextDestination.climateTags.some((tag) => tag.includes("cold") || tag === "cool"));
    setHotWeather(nextDestination.climateTags.some((tag) => tag.includes("hot") || tag === "tropical"));
  }

  function toggleTripType(value: TripType) {
    setTripTypes((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!Number.isFinite(durationDays) || durationDays < 1) {
      setError("Please enter a trip length of at least 1 day.");
      return;
    }

    if (durationDays > 90) {
      setError("Please keep the trip length under 90 days for this MVP.");
      return;
    }

    setError(null);

    onSubmit({
      destinationSlug,
      destinationName: selectedDestination.name,
      month,
      durationDays,
      luggageType,
      travelerType,
      tripTypes,
      hasLaundry,
      packLight,
      rainExpected,
      coldWeather,
      hotWeather,
      isInternational: isInternational || tripTypes.includes("international")
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft md:p-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Generator</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Packing List Generator</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Tell PackThisTrip the basics and it will generate a practical checklist using a local rules engine.</p>
      </div>

      {error ? <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Destination</span>
          <select value={destinationSlug} onChange={(event) => updateDestination(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10">
            {DESTINATIONS.map((destination) => <option key={destination.slug} value={destination.slug}>{destination.name}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">Month</span>
          <select value={month} onChange={(event) => setMonth(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10">
            {MONTHS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">Trip length in days</span>
          <input type="number" min={1} max={90} value={durationDays} onChange={(event) => setDurationDays(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10" />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">Luggage type</span>
          <select value={luggageType} onChange={(event) => setLuggageType(event.target.value as LuggageType)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10">
            {LUGGAGE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">Traveler type</span>
          <select value={travelerType} onChange={(event) => setTravelerType(event.target.value as TravelerType)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10">
            {TRAVELER_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-bold text-slate-700">Trip types</legend>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {ACTIVITY_OPTIONS.map((activity) => (
            <label key={activity.value} className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-slate-400">
              <input type="checkbox" checked={tripTypes.includes(activity.value)} onChange={() => toggleTripType(activity.value)} className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950" />
              <span>
                <span className="block text-sm font-bold text-slate-950">{activity.label}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">{activity.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-sm font-bold text-slate-700">Packing conditions</legend>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {[
            ["hasLaundry", "Laundry access", hasLaundry, setHasLaundry],
            ["packLight", "Pack light mode", packLight, setPackLight],
            ["rainExpected", "Rain expected", rainExpected, setRainExpected],
            ["coldWeather", "Cold weather", coldWeather, setColdWeather],
            ["hotWeather", "Hot weather", hotWeather, setHotWeather],
            ["isInternational", "International trip", isInternational, setIsInternational]
          ].map(([id, label, value, setter]) => (
            <label key={id as string} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
              <input type="checkbox" checked={value as boolean} onChange={(event) => (setter as (value: boolean) => void)(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950" />
              {label as string}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" className="w-full sm:w-auto">Generate checklist</Button>
        <p className="text-xs leading-5 text-slate-500">Your checklist is generated locally in your browser. No login or database is required.</p>
      </div>
    </form>
  );
}
