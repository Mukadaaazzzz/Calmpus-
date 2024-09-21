import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

const AdditionalSection = () => {
  return (
    <Box bg="white" py={10} px={6}>
      <VStack spacing={6} maxW="800px" mx="auto">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center">
          Join Our Student Community
        </Text>
        <Text fontSize="lg" textAlign="center">
          Become a part of the Calmpus community and enjoy exclusive offers, discounts, and the latest news on your favorite products. Sign up today to stay connected!
        </Text>
      </VStack>
    </Box>
  );
};

export default AdditionalSection;
