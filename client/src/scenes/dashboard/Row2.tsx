import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
// import { useTheme } from '@emotion/react'
import React, { useMemo } from 'react'
import { Box, Typography, useTheme } from "@mui/material"
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Cell, Pie, PieChart } from 'recharts'
import FlexBetween from '@/components/FlexBetween'

type Props = {}
const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 }
]

const Row2 = (props: Props) => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[300]]
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

            <DashboardBox gridArea="e">
                <BoxHeader title="Targets" subtitle="4%" sideText={''} />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart
                        width={110}
                        height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0,
                        }}
                        onMouseEnter={this.onPieEnter}
                    >
                        <Pie
                            data={pieData}
                            cx={120}
                            cy={200}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                        <Typography variant="h5">Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
                            83
                        </Typography>
                        <Typography variant="h6">
                            Finance goals of the campaign that is desired
                        </Typography>
                    </Box>
                    <Box flexBasis="40%">
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography variant="h6">Losses are down 25%</Typography>
                        <Typography mt="0.4rem" variant="h5">
                            Profit Margins
                        </Typography>
                        <Typography variant="h6">
                            Margins are up by 30% from last month.
                        </Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>

            {/* F DASHBOARD */}

            <DashboardBox gridArea="f"></DashboardBox>
        </>
    )
}

export default Row2