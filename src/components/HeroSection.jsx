import {
  Box,
  Heading,
  Button,
  Text,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const bgImage =
  '/calmu.jpg';

function HeroSection() {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <MotionBox
      minH="100vh"
      position="relative"
      overflow="hidden"
      style={{ y }}
      bg="gray.900"
    >
      {/* 🔹 Background Image with Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgImage={`url(${bgImage})`}
        bgSize="cover"
        bgPosition="center"
        zIndex={0}
        _after={{
          content: `""`,
          position: 'absolute',
          top: 0,
          left: 0,
          w: '100%',
          h: '100%',
          bgGradient: 'linear(to-b, rgba(0,0,0,0.2), rgba(0,0,0,0.85))',
          zIndex: 1,
        }}
      />

      {/* 🔹 Main Content */}
      <Flex
        position="relative"
        zIndex={2}
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        px={{ base: 4, md: 8 }}
        textAlign="center"
        
      >
        <MotionHeading
          as="h1"
          fontSize={{ base: '5xl', md: '7xl' }}
          mb={6}
          fontWeight="extrabold"
          lineHeight="1"
          color="white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Campus Life <br />
          <Box as="span" color="cyan.400">Reimagined</Box>
        </MotionHeading>

        <MotionText
          fontSize={{ base: 'xl', md: '2xl' }}
          color="whiteAlpha.800"
          mb={10}
          maxW="2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Box as="span" color="cyan.300">Transform</Box> your university
          experience with <Box as="span" color="pink.300">curated essentials</Box> and <Box as="span" color="purple.300">smart solutions</Box>.
        </MotionText>

        <MotionButton
          size="lg"
          px={10}
          py={6}
          bg="white"
          color="gray.900"
          borderRadius="full"
          fontWeight="bold"
          fontSize="xl"
          _hover={{ bg: 'gray.100', transform: 'scale(1.05)' }}
          _active={{ transform: 'scale(0.95)' }}
          onClick={() => navigate('/collections')}
          whileHover={{
            boxShadow: '0 0 40px rgba(255,255,255,0.3)',
            rotate: [0, 3, -3, 0],
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Begin Journey →
        </MotionButton>
      </Flex>

      {/* 🔹 Scroll indicator */}
      <MotionBox
        position="absolute"
        bottom="5%"
        left="50%"
        transform="translateX(-50%)"
        w={8}
        h={14}
        border="2px"
        borderColor="whiteAlpha.600"
        borderRadius="full"
        zIndex={2}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Box w={2} h={2} bg="white" borderRadius="full" mx="auto" mt={2} />
      </MotionBox>
    </MotionBox>
  );
}

export default HeroSection;
