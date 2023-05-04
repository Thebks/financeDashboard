import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["kpis"],
    endpoints: (builder) => ({
        getKpis: builder.query<void, void>({
            query: () => "kpi/kpis/",                   //KPI = Key Performance Indicators
            providesTags: ["kpis"]
        })
    })

})

export const { useGetKpisQuery } = api;