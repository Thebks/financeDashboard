import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';


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
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpensesData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[400]} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={palette.primary[400]} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="name" style={{ fontSize: "10px" }} />
                        <YAxis axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} domain={[3000, 23000]} ticks={[3000, 5000, 8000, 11000, 14000, 17000, 20000, 23000]} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area type="monotone" dataKey="expenses" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="b"></DashboardBox>
            <DashboardBox gridArea="c"></DashboardBox>
        </>
    )
}

export default Row1