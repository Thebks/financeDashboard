import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
// import { useTheme } from '@emotion/react'
import React, { useMemo } from 'react'
import { Box, Typography, useTheme } from "@mui/material"
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

type Props = {}

const Row2 = (props: Props) => {
    const { palette } = useTheme();
    const { data: productData } = useGetProductsQuery();
    const { data: operationalData } = useGetKpisQuery();
    // console.log('data:', data)

    const operations = useMemo(() => {
        return (
            operationalData &&
            operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
                return {
                    month: month.substring(0, 3),
                    "Operational Expenses": operationalExpenses,
                    "Non Operational Expenses": nonOperationalExpenses
                }
            })
        )
    }, [operationalData])

    return (
        <>
            <DashboardBox gridArea="d">
                <BoxHeader title="Operations & non-operations" subtitle="" sideText="This is a sidetext" />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={400}
                        data={operations}
                        margin={{
                            top: 15,
                            right: 25,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={palette.secondary[400]} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="1 1" vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" style={{ fontSize: "10px" }} />
                        <YAxis yAxisId="left" orientation="left" axisLine={false} style={{ fontSize: "10px" }} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} style={{ fontSize: "10px" }} />
                        <Tooltip />
                        <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
                        <Line type="monotone" yAxisId="left" dataKey="Non Operational Expenses" stroke={palette.primary.main} />
                        <Line type="monotone" yAxisId="right" dataKey="Operational Expenses" stroke={palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* E DASHBOARD */}

            <DashboardBox gridArea="e"></DashboardBox>

            {/* F DASHBOARD */}

            <DashboardBox gridArea="f"></DashboardBox>
        </>
    )
}

export default Row2