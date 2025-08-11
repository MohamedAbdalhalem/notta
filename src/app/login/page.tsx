'use client'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginForm from "_/_Components/LoginForm/LoginForm";
import { RootState } from "_/lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function login() {
  const { Token } = useSelector((state: RootState) => state.authSlice);
  const router = useRouter();

  useEffect(() => {
    
    if (Token) {
      router.push("/");
    }
  }, [Token, router]);

  if (Token) {
    return <div>Redirecting...</div>;
  }

  return (
    <Box component='div' className="px-6 py-4 max-w-xl mx-auto" >
      <Typography variant="h3" component='h1' className="text-center" sx={{ mb: '10px' }} >Login Now</Typography>
      <LoginForm />
    </Box>
  )
}
