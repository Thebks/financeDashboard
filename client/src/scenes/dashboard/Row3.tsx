import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

type Props = {}

const Row3 = (props: Props) => {

    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[500]];

    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();
    console.log("transactionData:", transactionData);
    console.log("productData:", productData);
    console.log("kpiData:", kpiData);

    const pieChartData = useMemo(() => {
        if (kpiData) {
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
                return [
                    {
                        name: key,
                        value: value,
                    },
                    {
                        name: `${key} of the product`,
                        value: totalExpenses - value,
                    },
                ];
            });
        }
    }, [kpiData]);

    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 1,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        }
    ]

    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 1
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 1,
            renderCell: (params: GridCellParams) => (params.value as Array<string>).length
        }
    ]

    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader title="This is the data grid" subtitle="" sideText={`${productData?.length} products`} />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none"
                        },
                        "& .MuiToolbar-root, & .MuiSvgIcon-root": {
                            color: palette.grey[200]
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`
                        },
                    }}>
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={false}
                        columns={productColumns}
                        rows={productData || []}
                    />
                </Box>
            </DashboardBox >

            {/* H DASHBOARD */}

            < DashboardBox gridArea="h" >
                <BoxHeader title="Latest Orders" subtitle="" sideText={`${transactionData?.length} Recent Transactions`} />
                <Box
                    mt="1rem"
                    p="0 0.5rem"
                    height="80%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none"
                        },
                        "& .MuiToolbar-root, & .MuiSvgIcon-root": {
                            color: palette.grey[200]
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`
                        },
                    }}>
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={false}
                        columns={transactionColumns}
                        rows={transactionData || []}
                    />
                </Box>
            </DashboardBox >

            {/* I DASHBOARD */}

            < DashboardBox gridArea="i" >
                <BoxHeader title="Expenses by Category" sideText="50%" subtitle={''} />
                <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center" >
                    {pieChartData?.map((data, i) => {
                        return (
                            <Box key={`${data[0].name} - ${i}`}>
                                <PieChart width={110} height={100}>
                                    <Pie
                                        stroke="none"
                                        data={data}
                                        innerRadius={18}
                                        outerRadius={35}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                                <Typography variant="h5">{data[0].name}</Typography>   {/* Seems to have a problem in this line*/}
                            </Box>
                        )
                    })}
                </FlexBetween>
            </DashboardBox >

            {/* J DASHBOARD */}

            <DashboardBox gridArea="j" >
                <BoxHeader title="Overall Summary and Data" sideText="+15%" subtitle={''} />
                <Box
                    height="15px"
                    margin="1.25rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[800]}
                    borderRadius="1rem"
                >
                    <Box
                        height="15px"
                        bgcolor={palette.primary[600]}
                        borderRadius="1rem"
                        width="40%"
                    ></Box>
                </Box>
                <Typography margin="0 1rem" variant="h6">
                    Some test to explain the stuff...
                </Typography>
            </DashboardBox >
        </>
    )
}

export default Row3