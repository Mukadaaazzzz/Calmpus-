import React from "react";
import { Box, Text, Link, IconButton, VStack, HStack } from "@chakra-ui/react";
import { FaYoutube, FaInstagram, FaFacebook, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="blue" color="white" p={15} w="100%" position="relative" paddingBottom="85px">
      <VStack align="flex-start" spacing={5}>
        {/* About */}
        <Box>
          <Text fontSize="lg" fontWeight="bold">About Calmpus</Text>
          <Text mt={3}>
            Calmpus is your trusted online marketplace for students, offering the best deals in electronics, fashion, health, beauty, and more. Fast delivery, great prices, and reliable customer service.
          </Text>
        </Box>

        {/* Contact Info */}
        <Box>
          <Text fontSize="lg" fontWeight="bold">Contact Us</Text>
          <Text>Email: calmpusmail@gmail.com</Text>
          <Text>Phone: +2349016049199</Text>
          <Text>Address: Lagos, Nigeria</Text>
        </Box>

        {/* Social Media Links */}
        <Box>
          <Text fontSize="lg" fontWeight="bold">Follow Us</Text>
          <HStack spacing={2} mt={1}>
            <IconButton as="a" href="https://youtube.com" target="_blank" aria-label="YouTube" icon={<FaYoutube />} size="lg" bg="black" color="white" />
            <IconButton as="a" href="https://instagram.com" target="_blank" aria-label="Instagram" icon={<FaInstagram />} size="lg" bg="black" color="white" />
            <IconButton as="a" href="https://facebook.com" target="_blank" aria-label="Facebook" icon={<FaFacebook />} size="lg" bg="black" color="white" />
            <IconButton as="a" href="https://twitter.com" target="_blank" aria-label="Twitter" icon={<FaTwitter />} size="lg" bg="black" color="white" />
            <IconButton as="a" href="https://tiktok.com" target="_blank" aria-label="TikTok" icon={<FaTiktok />} size="lg" bg="black" color="white" />
          </HStack>
        </Box>

        {/* Copyright */}
        <Box textAlign="center" w="100%">
          <Text>© 2024 Calmpus. Made in Mukadaz Labs.</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Footer;
