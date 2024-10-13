import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import Link from 'next/link';

export default function Navbar() {
    return (
        <Stack direction={"row"} sx={{ height: '62px', justifyContent: 'space-between', alignItems: 'center', p: '0px 50px', m: 0, bgcolor: '#fff' }}>
            <Box style={{ display: 'flex', gap: '4px', listStyleType: 'none' }}>
                <Image
                    src="/images/favicon.png"
                    width={50}
                    height={50}
                    alt="Logo"
                    className="navLogo"
                />
            </Box>
            <Box className="navList">
                <Button><Link href="/">Old</Link></Button>
                <Button><Link href="/newTickets">New</Link></Button>
                <Button><Link href="/holdTickets">Hold</Link></Button>
                <Button><Link href="/qaTickets">Qa</Link></Button>
                <Button><Link href="/login">Login</Link></Button>
            </Box>
        </Stack>
    );
}
