import { Box, Text, Image, Heading, VStack, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

const categories = [
  {
    name: 'Phones & Laptops',
    image: '/phones.jpg',
    description: 'Top brands & latest tech gadgets all in one place.',
    path: 'phones-laptops',
  },
  {
    name: 'Fashion',
    image: '/fashion.jpg',
    description: 'Stay stylish with trending outfits and accessories.',
    path: 'fashion',
  },
  {
    name: 'Electronics',
    image: '/electronics.jpg',
    description: 'Smart gadgets, sound systems, and more.',
    path: 'electronics',
  },
  {
    name: 'Gaming',
    image: '/game.jpg',
    description: 'Explore consoles, accessories & epic titles.',
    path: 'gaming',
  },
];

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionLink = motion(ChakraLink);

function CategoryCards() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  // Auto-scroll logic
  useEffect(() => {
    if (!isMobile || isPaused) return;

    const scrollContainer = scrollRef.current;
    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scroll = async () => {
      await controls.start({
        x: -scrollWidth,
        transition: { duration: scrollWidth / 100, ease: 'linear' },
      });
      await controls.start({ x: 0, transition: { duration: 0 } });
    };

    const interval = setInterval(scroll, scrollWidth / 100 * 1000);
    return () => clearInterval(interval);
  }, [isPaused, controls, isMobile]);

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
    hover: { scale: 1.05, y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' },
    tap: { scale: 0.95 },
  };

  return (
    <Box
      bgGradient="linear(to-b, gray.50, purple.50)"
      px={{ base: 4, md: 10 }}
      py={{ base: 10, md: 16 }}
      position="relative"
      overflow="hidden"
    >
      {/* Floating Particles for Visual Depth */}
      <MotionBox
        position="absolute"
        w="100%"
        h="100%"
        initial="hidden"
        animate="visible"
      >
        {[...Array(isMobile ? 5 : 10)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            w={6}
            h={6}
            bg="cyan.300"
            borderRadius="full"
            initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, scale: 0 }}
            animate={{ scale: [0, 1, 0], x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: 'easeInOut' }}
            opacity={0.4}
            style={{ filter: 'blur(4px)' }}
          />
        ))}
      </MotionBox>

      {/* Header Section */}
      <VStack spacing={4} mb={{ base: 8, md: 10 }} textAlign="center">
        <MotionHeading
          fontSize={{ base: '2xl', md: '4xl' }}
          bgGradient="linear(to-r, cyan.400, purple.400)"
          bgClip="text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Categories You’ll Love
        </MotionHeading>
        <MotionText
          fontSize={{ base: 'md', md: 'lg' }}
          color="gray.600"
          maxW="lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          From tech to fashion, discover quality collections that match your vibe.
        </MotionText>
        <MotionLink
          as={Link}
          to="/collections"
          fontWeight="bold"
          fontSize={{ base: 'sm', md: 'md' }}
          color="white"
          bg="cyan.400"
          px={4}
          py={2}
          borderRadius="full"
          _hover={{ bg: 'cyan.500', textDecoration: 'none' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          View All Collections →
        </MotionLink>
      </VStack>

      {/* Horizontal Scrollable Cards */}
      <Box
        ref={scrollRef}
        overflowX={{ base: 'auto', lg: 'visible' }}
        py={4}
        px={1}
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollSnapType: 'x mandatory',
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
        aria-label="Category carousel"
      >
        <HStack
          spacing={{ base: 4, md: 6 }}
          minWidth="100%"
          flexWrap={{ base: 'nowrap', lg: 'wrap' }}
          justify={{ lg: 'center' }}
          as={motion.div}
          animate={controls}
        >
          {categories.map((category, i) => (
            <MotionBox
              key={category.name}
              bg="whiteAlpha.900"
              borderRadius="xl"
              minW={{ base: '80vw', md: '280px' }}
              maxW={{ base: '80vw', md: '300px' }}
              minH={{ base: '340px', md: '360px' }} // Increased height
              scrollSnapAlign="center"
              boxShadow="lg"
              p={5}
              backdropFilter="blur(8px)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              initial="hidden"
              animate="visible"
              custom={i}
              variants={cardVariants}
              whileHover={isMobile ? {} : cardVariants.hover}
              whileTap={cardVariants.tap}
              cursor="pointer"
              as={Link}
              to={`/categories/${category.path}`}
              _hover={{ textDecoration: 'none' }}
              aria-label={`Explore ${category.name}`}
            >
              <VStack spacing={4} align="start">
                <Image
                  src={category.image}
                  alt={category.name}
                  borderRadius="md"
                  objectFit="cover"
                  w="100%"
                  h={{ base: '200px', md: '220px' }} // Increased image height
                />
                <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="gray.800">
                  {category.name}
                </Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
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