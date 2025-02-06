import {  Abril_Fatface, Poppins } from 'next/font/google';

export const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
});

export const abril_fatface = Abril_Fatface({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-abril-fatface',
});