import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Trip, TripCreate } from "@/models/Trip";
import { Region } from "@/models/Region";

export const tripApi = createApi({
  reducerPath: "tripApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://67a316ef409de5ed52575a88.mockapi.io/api",
  }),
  tagTypes: ["Trips", "Regions"],
  endpoints: (builder) => ({
    getTrips: builder.query<Trip[], void>({
      query: () => "/trip",
      providesTags: ["Trips"],
    }),
    getRegions: builder.query<Region[], void>({
      query: () => "/regions",
      providesTags: ["Regions"],
    }),
    addTrip: builder.mutation<void, TripCreate>({
      query: (newTrip) => ({
        url: "/trip",
        method: "POST",
        body: newTrip,
      }),
      invalidatesTags: ["Trips"],
    }),
  }),
});

export const { useGetTripsQuery, useAddTripMutation, useGetRegionsQuery } = tripApi;
