import { Box, SimpleGrid, Text, Image, Flex, Center, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Phones & Laptops', image: '/phones.jpg' },
  { name: 'Fashion', image: '/fashion.jpg' },
  { name: 'Electronics', image: '/electronics.jpg' },
  { name: 'Gaming', image: '/game.jpg' },
];

const MotionBox = motion(Box);

function CategoryCards() {
  return (
    <Box bg="gray.100" p={{ base: 5, md: 10, lg: 20 }}>
      <Flex justifyContent="center" mb={10}>
        <Heading fontSize={{ base: '2xl', md: '3xl' }} mb={2}>All your favourites!</Heading>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        {categories.map((category) => (
          <MotionBox
            key={category.name}
            p={5}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            whileHover={{ y: -10, scale: 1.05 }}
            transition="0.3s"
          >
            <div>
              <Image src={category.image} alt={category.name} borderRadius="lg" mb={3} />
              <Text fontWeight="bold" fontSize="lg" textAlign="center">
                {category.name}
              </Text>
            </div>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default CategoryCards;