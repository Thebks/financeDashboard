import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse } from "./types";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products"],
    endpoints: (builder) => ({
        getKpis: builder.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis/",                       //KPI = Key Performance Indicators
            providesTags: ["Kpis"],
        }),
        getProducts: builder.query<Array<GetProductsResponse>, void>({
            query: () => "product/products/",                       //KPI = Key Performance Indicators
            providesTags: ["Products"],
        }),

    })

})

export const { useGetKpisQuery, useGetProductsQuery } = api;