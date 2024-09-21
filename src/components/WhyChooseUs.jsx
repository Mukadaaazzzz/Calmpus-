import React from "react";
import { Box, Flex, Heading, Text, VStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { FaTruck, FaShieldAlt, FaDollarSign, FaAward } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <Box py={20} bg="gray.100" textAlign="center" px={5}>
      <Heading as="h2" size="xl" mb={8}>
        Why Choose Calmpus?
      </Heading>

      {/* Content */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        <VStack spacing={4}>
          <Icon as={FaTruck} w={16} h={16} color="blue.500" />
          <Heading as="h3" size="md">
            Fast Delivery
          </Heading>
          <Text color="gray.600">
            We ensure quick and reliable delivery so you can enjoy your purchases without delay.
          </Text>
        </VStack>

        <VStack spacing={4}>
          <Icon as={FaShieldAlt} w={16} h={16} color="blue.500" />
          <Heading as="h3" size="md">
            Secure Payments
          </Heading>
          <Text color="gray.600">
            Your security is our priority. We provide secure payment options for a safe shopping experience.
          </Text>
        </VStack>

        <VStack spacing={4}>
          <Icon as={FaDollarSign} w={16} h={16} color="blue.500" />
          <Heading as="h3" size="md">
            Affordable Prices
          </Heading>
          <Text color="gray.600">
            Get the best deals on all your favorite products, specially curated for students.
          </Text>
        </VStack>

        <VStack spacing={4}>
          <Icon as={FaAward} w={16} h={16} color="blue.500" />
          <Heading as="h3" size="md">
            Quality Products
          </Heading>
          <Text color="gray.600">
            We provide top-quality products from trusted brands, ensuring satisfaction with every purchase.
          </Text>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default WhyChooseUs;
