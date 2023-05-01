import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, useTheme, Typography } from '@mui/material'
import FlexBetween from '@/components/FlexBetween'
import TerminalIcon from '@mui/icons-material/Terminal';

type Props = {}

const Navbar = (props: Props) => {
    const { palette } = useTheme();
    const [isSelect, setIsSelect] = useState("Dashboard")
    return (
        <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
            {/* LEFT*/}
            <FlexBetween gap="0.75rem">
                <TerminalIcon sx={{ fontSize: "30px" }} />
                <Typography variant="h4" fontSize="16px">
                    CodeFinance
                </Typography>
            </FlexBetween>
            {/* RIGHT */}
            <FlexBetween gap="2rem">
                <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                    <Link
                        to="/"
                        onClick={() => setIsSelect("dashboard")}
                        style={{ color: isSelect === "dashboard" ? "inherit" : palette.grey[700], textDecoration: "inherit" }}
                    >
                        Dashboard
                    </Link>
                </Box>
                <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                    <Link
                        to="/predictions"
                        onClick={() => setIsSelect("predictions")}
                        style={{ color: isSelect === "predictions" ? "inherit" : palette.grey[700], textDecoration: "inherit" }}
                    >
                        Predictions
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar