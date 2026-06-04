import type { TripConfig } from "@/lib/types";

export const carryOnPackingList: TripConfig = {
  destinationSlug: "italy",
  destinationName: "Italy",
  month: "June",
  durationDays: 5,
  luggageType: "carry-on",
  travelerType: "solo",
  tripTypes: ["city", "international"],
  hasLaundry: false,
  packLight: true,
  rainExpected: false,
  coldWeather: false,
  hotWeather: true,
  isInternational: true
};

export const beachVacationPackingList: TripConfig = {
  destinationSlug: "hawaii",
  destinationName: "Hawaii",
  month: "July",
  durationDays: 6,
  luggageType: "checked",
  travelerType: "couple",
  tripTypes: ["beach"],
  hasLaundry: true,
  packLight: false,
  rainExpected: false,
  coldWeather: false,
  hotWeather: true,
  isInternational: false
};

export const cruisePackingList: TripConfig = {
  destinationSlug: "mexico",
  destinationName: "Mexico",
  month: "March",
  durationDays: 7,
  luggageType: "both",
  travelerType: "couple",
  tripTypes: ["cruise", "beach"],
  hasLaundry: false,
  packLight: false,
  rainExpected: false,
  coldWeather: false,
  hotWeather: true,
  isInternational: true
};

export const businessTripPackingList: TripConfig = {
  destinationSlug: "new-york",
  destinationName: "New York",
  month: "October",
  durationDays: 3,
  luggageType: "carry-on",
  travelerType: "solo",
  tripTypes: ["business", "city"],
  hasLaundry: false,
  packLight: true,
  rainExpected: true,
  coldWeather: false,
  hotWeather: false,
  isInternational: false
};

export const internationalTravelPackingList: TripConfig = {
  destinationSlug: "japan",
  destinationName: "Japan",
  month: "April",
  durationDays: 10,
  luggageType: "both",
  travelerType: "solo",
  tripTypes: ["international", "city"],
  hasLaundry: true,
  packLight: false,
  rainExpected: true,
  coldWeather: false,
  hotWeather: false,
  isInternational: true
};

export const familyVacationPackingList: TripConfig = {
  destinationSlug: "florida",
  destinationName: "Florida",
  month: "May",
  durationDays: 6,
  luggageType: "both",
  travelerType: "family",
  tripTypes: ["beach", "disney"],
  hasLaundry: true,
  packLight: false,
  rainExpected: true,
  coldWeather: false,
  hotWeather: true,
  isInternational: false
};

export const babyTravelPackingList: TripConfig = {
  destinationSlug: "florida",
  destinationName: "Florida",
  month: "May",
  durationDays: 4,
  luggageType: "both",
  travelerType: "baby-kids",
  tripTypes: ["city", "disney"],
  hasLaundry: true,
  packLight: false,
  rainExpected: true,
  coldWeather: false,
  hotWeather: true,
  isInternational: false
};

export const sevenDayTripPackingList: TripConfig = {
  destinationSlug: "spain",
  destinationName: "Spain",
  month: "September",
  durationDays: 7,
  luggageType: "carry-on",
  travelerType: "solo",
  tripTypes: ["city", "beach", "international"],
  hasLaundry: false,
  packLight: true,
  rainExpected: false,
  coldWeather: false,
  hotWeather: true,
  isInternational: true
};

export const weekendTripPackingList: TripConfig = {
  destinationSlug: "new-york",
  destinationName: "New York",
  month: "May",
  durationDays: 2,
  luggageType: "carry-on",
  travelerType: "solo",
  tripTypes: ["city"],
  hasLaundry: false,
  packLight: true,
  rainExpected: false,
  coldWeather: false,
  hotWeather: false,
  isInternational: false
};

export const winterTravelPackingList: TripConfig = {
  destinationSlug: "iceland",
  destinationName: "Iceland",
  month: "January",
  durationDays: 6,
  luggageType: "checked",
  travelerType: "solo",
  tripTypes: ["international", "hiking"],
  hasLaundry: false,
  packLight: false,
  rainExpected: true,
  coldWeather: true,
  hotWeather: false,
  isInternational: true
};

export const summerTravelPackingList: TripConfig = {
  destinationSlug: "costa-rica",
  destinationName: "Costa Rica",
  month: "July",
  durationDays: 8,
  luggageType: "both",
  travelerType: "couple",
  tripTypes: ["beach", "hiking", "international"],
  hasLaundry: true,
  packLight: false,
  rainExpected: true,
  coldWeather: false,
  hotWeather: true,
  isInternational: true
};
