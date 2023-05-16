import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery } from '@/state/api'
import { Typography, useTheme, Box, Button } from '@mui/material'
import React, { useState, useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import regression, { DataPoint } from "regression"


const Predictions = () => {

    const { palette } = useTheme();
    const [isPredictions, setIsPredictions] = useState(false);
    const { data: kpiData } = useGetKpisQuery();


    const formattedData = useMemo(() => {
        if (!kpiData) return [];
        const monthData = kpiData[0].monthlyData;

        const formatted: Array<DataPoint> = monthData.map(({ revenue }, i: number) => {
            return [i, revenue]
        });
        const regressionLine = regression.linear(formatted);

        return monthData.map(({ month, revenue }, i: number) => {
            return {
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1],
                "Predicted Revenue": regressionLine.predict(i + 12)[1],
            };
        });
    }, [kpiData]);

    return (
        <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
            <FlexBetween m="1rem 2.5rem">
                <Box>
                    <Typography variant="h3"> Revenue & Predictions</Typography>
                    <Typography variant="h6"> Predictions baised on Linear Charts also models</Typography>
                </Box>
                <Button
                    sx={{
                        color: palette.grey[900],
                        backgroundColor: palette.grey[700],
                        boxShadow: "none",
                        transition: "box-shadow 0.2s ease-in-out",
                        '&:hover': {
                            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, .4)",
                        },
                    }}
                    onClick={() => setIsPredictions(!isPredictions)}
                >
                    Show Revenue for Next Year and years to come
                </Button>
            </FlexBetween>
            <ResponsiveContainer height="100%" width="100%" >
                <LineChart
                    width={500}
                    height={400}
                    data={formattedData}
                    margin={{
                        top: 10,
                        right: 75,
                        left: 20,
                        bottom: 80,
                    }}
                >
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={palette.secondary[400]} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
                    <XAxis dataKey="name" style={{ fontSize: "10px" }} />
                    <YAxis
                        axisLine={false}
                        style={{ fontSize: "10px" }}
                        domain={[3000, 23000]}
                        tickFormatter={v => `$${v}`}
                        ticks={[3000, 5000, 8000, 11000, 14000, 17000, 20000, 23000]}
                    />
                    <Tooltip />
                    <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} verticalAlign="top" />
                    <Line type="monotone" dataKey="Actual Revenue" stroke={palette.primary.main} strokeWidth={0} dot={{ strokeWidth: 5 }} />
                    <Line type="monotone" dataKey="Regression Line" stroke="#8884d8" dot={false} />
                    {isPredictions && (
                        <Line strokeDasharray="5 5" dataKey="Predicted Revenue" stroke={palette.secondary[500]} dot={false} />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    )
}

export default Predictions