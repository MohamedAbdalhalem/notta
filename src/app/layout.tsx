'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from "_/_Components/Navbar/Navbar";
import Footer from "_/_Components/Footer/Footer";
import { CssBaseline } from "@mui/material";
import { Provider } from 'react-redux'
import { store } from "_/lib/redux/store";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const theme =  createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class'
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navbar  />
          <CssBaseline />
        {children}
        <Footer/>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
