import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line, LineChart, Legend, Bar, BarChart } from 'recharts';


const Row1 = () => {
    const { palette } = useTheme();
    const { data } = useGetKpisQuery();
    console.log('data:', data);

    const revenueExpensesData = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses
                }
            })
        )
    }, [data])

    const profitRevenueData = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    profit: revenue - expenses
                }
            })
        )
    }, [data])

    const revenueData = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                }
            })
        )
    }, [data])

    try {
        const theElement = document.getElementById('colorRevenue') as Element | null

        if (theElement) {
            const colorR = window.getComputedStyle(theElement);
            console.log(colorR);
        }
    } catch (error) {
        console.log(error)
    }


    return (
        <>
            <DashboardBox gridArea="a">
                <BoxHeader title="Revenue Expenses" subtitle="This is a subtitle" sideText="This is a sidetext" />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpensesData}
                        margin={{
                            top: 15,
                            right: 25,
                            left: -10,
                            bottom: 60,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={palette.secondary[400]} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={palette.secondary[400]} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        {/* <CartesianGrid strokeDasharray="1 1" /> */}
                        <XAxis dataKey="name" style={{ fontSize: "10px" }} />
                        <YAxis axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} domain={[3000, 23000]} ticks={[3000, 5000, 8000, 11000, 14000, 17000, 20000, 23000]} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area type="monotone" dataKey="expenses" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* B Dashboard */}

            <DashboardBox gridArea="b">
                <BoxHeader title="Profit and revenue" subtitle="This is a subtitle" sideText="This is a sidetext" />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={400}
                        data={profitRevenueData}
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
                        <YAxis yAxisId="left" axisLine={false} style={{ fontSize: "10px" }} ticks={[3000, 5000, 8000, 11000, 14000, 17000, 20000, 23000]} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} style={{ fontSize: "10px" }} ticks={[3000, 5000, 8000, 11000, 14000, 17000, 20000, 23000]} />
                        <Tooltip />
                        <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
                        <Line type="monotone" yAxisId="left" dataKey="profit" stroke={palette.primary.main} />
                        <Line type="monotone" yAxisId="right" dataKey="revenue" stroke={palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* C Dashboard */}


            <DashboardBox gridArea="c">
                <BoxHeader title="Month by Month" subtitle="This is a subtitle" sideText="This is a sidetext" />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={revenueData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Row1