import { Box, Heading, Button, Text, Flex, useBreakpointValue, keyframes } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const bgImage = '/xca.jpg';

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

function HeroSection() {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const floatAnimation = `${float} 3s ease-in-out infinite`;

  return (
    <Box
      position="relative"
      h="100vh"
      maxH="-webkit-fill-available"
      overflow="hidden"
      bg="gray.900"
    >
      {/* Background Image with Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgImage={`url(${bgImage})`}
        bgSize="cover"
        bgPosition="center"
        transform="scale(1.05)"
        transition="transform 0.5s ease"
        _after={{
          content: '""',
          position: 'absolute',
          inset: 0,
          bgGradient: 'linear(to-b, blackAlpha.400, blackAlpha.700)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.2)'
        }}
        _hover={{ transform: 'scale(1.03)' }}
      />

      {/* Main Content */}
      <Flex
        position="relative"
        zIndex={2}
        direction="column"
        align="center"
        justify="center"
        h="full"
        px={{ base: 4, md: 8 }}
        textAlign="center"
        backdropFilter="blur(2px)"
      >
        <Heading
          as="h1"
          fontSize={{ base: '4xl', sm: '5xl', md: '7xl' }}
          mb={6}
          fontWeight="extrabold"
          lineHeight="0.95"
          color="white"
          textShadow="0 4px 30px rgba(0,0,0,0.6)"
        >
          Campus Life{' '}
          <Box
            as="span"
            display={{ md: 'block' }}
            bgGradient="linear(to-r, cyan.400, blue.400)"
            bgClip="text"
            animation={floatAnimation}
          >
            Reimagined
          </Box>
        </Heading>

        <Text
          fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
          color="whiteAlpha.800"
          mb={10}
          maxW="2xl"
          px={4}
          textShadow="0 2px 15px rgba(0,0,0,0.4)"
        >
          <Box as="span" color="cyan.300">Transform</Box> your university
          experience with{' '}
          <Box as="span" color="pink.300">curated essentials</Box> and{' '}
          <Box as="span" color="purple.300">smart solutions</Box>.
        </Text>

        <Button
          size={{ base: 'md', sm: 'lg' }}
          px={{ base: 8, sm: 10 }}
          py={{ base: 5, sm: 6 }}
          bgGradient="linear(to-r, cyan.500, blue.500)"
          color="white"
          borderRadius="full"
          fontWeight="bold"
          fontSize={{ base: 'lg', sm: 'xl' }}
          transition="all 0.3s ease"
          _hover={{
            bgGradient: 'linear(to-r, cyan.600, blue.600)',
            transform: 'scale(1.05)',
            boxShadow: '0 0 40px rgba(81,180,214,0.4)'
          }}
          _active={{ transform: 'scale(0.95)' }}
          onClick={() => navigate('/collections')}
        >
          Begin Journey →
        </Button>

        {/* Scroll Indicator */}
        <Box
          position="absolute"
          bottom="5%"
          left="50%"
          transform="translateX(-50%)"
          w={8}
          h={14}
          display={{ base: 'none', md: 'block' }}
          animation={floatAnimation}
        >
          <Box
            w={2}
            h={2}
            bg="white"
            borderRadius="full"
            mx="auto"
            mt={2}
            boxShadow="0 0 15px rgba(255,255,255,0.3)"
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default HeroSection;