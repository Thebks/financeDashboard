import DashboardBox from '@/components/DashboardBox'
import { useGetTransactionsQuery } from '@/state/api'
import React from 'react'

type Props = {}

const Row3 = (props: Props) => {

    const { data: transactionsData } = useGetTransactionsQuery();
    console.log("transactionsData:", transactionsData);

    return (
        <>
            <DashboardBox gridArea="g">

            </DashboardBox>

            {/* H DASHBOARD */}

            <DashboardBox gridArea="h"></DashboardBox>

            {/* I DASHBOARD */}

            <DashboardBox gridArea="i"></DashboardBox>

            {/* J DASHBOARD */}

            <DashboardBox gridArea="j"></DashboardBox>
        </>
    )
}

export default Row3