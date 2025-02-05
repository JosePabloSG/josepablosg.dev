import {  Poppins, Spicy_Rice } from 'next/font/google';

export const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
});

export const spicy_rice = Spicy_Rice({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-spicy-rice',
});