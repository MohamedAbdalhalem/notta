import React from "react";
import { Typography, Link, IconButton, Divider, Box } from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box component='footer'
      sx={{ boxShadow: ' 0px -2px 2px 0px rgba(0, 0, 0, 0.2)', }} 
      className="shadow-2xl mt-4 pt-5">
      <div className=" mx-auto px-6">
        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div>
            <Typography variant="h6" color="textPrimary" fontWeight="bold">
              MyBrand
            </Typography>
            <Typography variant="body2" className="mt-2">
              Building amazing web experiences with modern tools and best practices.
            </Typography>
          </div>

          {/* Quick Links */}
          <div>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <div className="flex flex-col space-y-2">
              <Link href="#" underline="hover" color="inherit">Home</Link>
              <Link href="#" underline="hover" color="inherit">About</Link>
              <Link href="#" underline="hover" color="inherit">Services</Link>
              <Link href="#" underline="hover" color="inherit">Contact</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <div className="flex flex-col space-y-2">
              <Link href="#" underline="hover" color="inherit">Blog</Link>
              <Link href="#" underline="hover" color="inherit">Help Center</Link>
              <Link href="#" underline="hover" color="inherit">Privacy Policy</Link>
              <Link href="#" underline="hover" color="inherit">Terms of Service</Link>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <div className="flex space-x-4">
              <IconButton href="#" color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Divider & Footer Bottom */}
        <Divider sx={{my:'10px'}} />
        <Typography variant="body2" className="text-center" sx={{mt:'20px'}}>
          © 2025 MyBrand. All rights reserved.
        </Typography>
      </div>
    </Box>
  );
}
