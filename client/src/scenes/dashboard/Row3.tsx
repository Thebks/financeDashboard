import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { Palette } from '@mui/icons-material'
import { Box, useTheme } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import React from 'react'

type Props = {}

const Row3 = (props: Props) => {

    const { palette } = useTheme();
    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();
    console.log("transactionData:", transactionData);
    console.log("productData:", productData);
    console.log("kpiData:", kpiData);

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

            < DashboardBox gridArea="i" ></DashboardBox >

            {/* J DASHBOARD */}

            < DashboardBox gridArea="j" ></DashboardBox >
        </>
    )
}

export default Row3