import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
     <>
      <Header />
    <Box p={4} textAlign="center">
      <Text fontSize="3xl" fontWeight="bold" mb={4}>Thank You for Your Purchase!</Text>
      <Text fontSize="lg" mb={6}>Your order has been successfully placed.</Text>
      <Button colorScheme="blue" onClick={handleBackToHome}>Back to Home</Button>
    </Box>
    </>
  );
};

export default ThankYouPage;
