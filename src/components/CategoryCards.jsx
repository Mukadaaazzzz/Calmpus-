import { Box, Text, Image, Heading, VStack, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Phones & Laptops',
    image: '/phones.jpg',
    description: 'Top brands & latest tech gadgets all in one place.',
  },
  {
    name: 'Fashion',
    image: '/fashion.jpg',
    description: 'Stay stylish with trending outfits and accessories.',
  },
  {
    name: 'Electronics',
    image: '/electronics.jpg',
    description: 'Smart gadgets, sound systems, and more.',
  },
  {
    name: 'Gaming',
    image: '/game.jpg',
    description: 'Explore consoles, accessories & epic titles.',
  },
];

const MotionBox = motion(Box);

function CategoryCards() {
  return (
    <Box bg="gray.100" px={{ base: 4, md: 10 }} py={16}>
      <VStack spacing={3} mb={10} textAlign="center">
        <Heading fontSize={{ base: '2xl', md: '3xl' }}>
          Categories You’ll Love
        </Heading>
        <Text fontSize="md" color="gray.600" maxW="lg">
          From tech to fashion, discover quality collections that match your vibe.
        </Text>
        <ChakraLink
          as={Link}
          to="/collections"
          fontWeight="semibold"
          fontSize="sm"
          color="blue.500"
          _hover={{ textDecoration: 'underline' }}
        >
          View All Collections →
        </ChakraLink>
      </VStack>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <Box
        overflowX={{ base: 'auto', lg: 'visible' }}
        py={4}
        px={1}
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollSnapType: 'x mandatory',
        }}
      >
        <HStack
          spacing={6}
          minWidth="100%"
          flexWrap={{ base: 'nowrap', lg: 'wrap' }}
          justify={{ lg: 'center' }}
        >
          {categories.map((category) => (
            <MotionBox
              key={category.name}
              bg="white"
              borderRadius="xl"
              minW={{ base: '250px', md: '280px' }}
              maxW="300px"
              scrollSnapAlign="start"
              boxShadow="md"
              p={4}
              whileHover={{ scale: 1.03, y: -5 }}
              transition="0.3s ease"
              cursor="pointer"
            >
              <VStack spacing={3} align="start">
                <Image
                  src={category.image}
                  alt={category.name}
                  borderRadius="md"
                  objectFit="cover"
                  w="100%"
                  h="160px"
                />
                <Text fontSize="lg" fontWeight="bold">
                  {category.name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {category.description}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}

export default CategoryCards;