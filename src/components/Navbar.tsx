'use client'
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import Link from 'next/link';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { useState } from "react";
import CachedIcon from '@mui/icons-material/Cached';

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    return (
        <Stack direction={"row"} sx={{ height: '62px', justifyContent: 'space-between', alignItems: 'center', p: '0px 50px', m: 0, bgcolor: '#37474F' }}>
            <Link href="/">
                <Box style={{ display: 'flex', gap: '4px', listStyleType: 'none' }}>
                    <Image
                        src="/images/favicon.png"
                        width={50}
                        height={50}
                        alt="Logo"
                        className="navLogo"
                    />
                </Box>
            </Link>
            <Box>
                Date : 12-11-2024
            </Box>
            <Box className="navList">
                {/* <Button><Link href="/">Old</Link></Button>
                <Button><Link href="/newTickets">New</Link></Button>
                <Button><Link href="/holdTickets">Hold</Link></Button>
                <Button><Link href="/qaTickets">Qa</Link></Button> */}
                <Button><CachedIcon /></Button>
                <Button>Add List</Button>
                <Button><Link href="/login">Login</Link></Button>
                <Button sx={{ bgcolor: isDarkMode ? 'black' : '#f5f7fa', cursor: 'pointer', outline: isDarkMode ? '1px solid white' : '' }} onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? <WbSunnyRoundedIcon sx={{ color: 'white' }} /> : <ModeNightRoundedIcon sx={{ color: 'black' }} />}</Button>
            </Box>
        </Stack>
    );
}
