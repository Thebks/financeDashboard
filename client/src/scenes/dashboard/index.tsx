import React from 'react'
import { Box, useTheme, Typography, useMediaQuery } from '@mui/material'

const gridTemplateLargeScreens = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h i"
"g h i"
"g h j"
"g h j"
`;

const gridTemplateSmallScreens = `
"a"
"a"
"a"
"a"
"b"
"b"
"b"
"b"
"c"
"c"
"c"
"d"
"d"
"d"
"e"
"e"
"f"
"f"
"f"
"g"
"g"
"g"
"h"
"h"
"h"
"h"
"i"
"i"
"j"
"j"
`;

type Props = {}

const Dashboard = (props: Props) => {

    const isAboveMeduimScreens = useMediaQuery("(max-width = 1200px)")
    const { palette } = useTheme();
    return (
        <Box
            height="100%"
            width="100%"
            display="grid"
            gap="1.5rem"
            sx={{
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens,
            }}>
            <Box bgcolor="#8b0000" gridArea="a"></Box>
            <Box bgcolor="#FAF9F6" gridArea="b"></Box>
            <Box bgcolor="#FAF9F6" gridArea="c"></Box>
            <Box bgcolor="#FAF9F6" gridArea="d"></Box>
            <Box bgcolor="#FAF9F6" gridArea="e"></Box>
            <Box bgcolor="#FAF9F6" gridArea="f"></Box>
            <Box bgcolor="#FAF9F6" gridArea="g"></Box>
            <Box bgcolor="#FAF9F6" gridArea="h"></Box>
            <Box bgcolor="#FAF9F6" gridArea="i"></Box>
            <Box bgcolor="#FAF9F6" gridArea="j"></Box>
        </Box>
    )
}


export default Dashboard