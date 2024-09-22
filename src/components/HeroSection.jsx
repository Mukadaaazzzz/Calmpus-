import { Box, Heading, Button, Text, Image, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionImage = motion(Image);

function HeroSection() {
  const navigate = useNavigate();  // Initialize navigate function

  return (
    <Box
      textAlign="center"
      bgGradient="linear(to-r, white.500, pink.500)"
      p={{ base: 3, md: 10, lg: 12 }}
      color="blue"
      borderBottomRadius="lg"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgGradient="linear(to-r, rgba(255,255,255,0.5), rgba(255,105,180,0.5))"
      />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        py={{ base: 5, md: 10 }}
      >
        <Box flex="1" mb={{ base: 10, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
          <MotionHeading
            size="xl"  // Reduced heading size
            mb={5}
            fontWeight="extrabold"
            letterSpacing="tight"
            animate={{ opacity: [0, 1], y: [-20, 0] }}
            transition={{ duration: 1 }}
          >
            Find Everything You Need for Campus Life!
          </MotionHeading>
          <MotionText
            fontSize="lg"
            mb={10}
            lineHeight="1.8"
            animate={{ opacity: [0, 1], y: [-10, 0] }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            From gadgets to fashion, all at student-friendly prices. Shop now and enjoy the best deals.
          </MotionText>
          
          <MotionButton
            size="lg"
            colorScheme="yellow"
            bg="yellow.400"
            _hover={{ bg: 'yellow.500', transform: 'scale(1.05)', transition: '0.3s', boxShadow: 'md' }}
            transition="0.3s"
            animate={{ opacity: [0, 1], y: [-10, 0] }}
            onClick={() => navigate("/collections")}  // Navigate to collections on click
          >
            Start Shopping
          </MotionButton>
        </Box>

        {/* Animate the image as well */}
        <MotionImage
          src="/delivery.png"
          alt="Student shopping"
          w={{ base: '90%', md: '50%', lg: '40%' }}
          animate={{ opacity: [0, 1], scale: [0.9, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
          mx="auto"
        />
      </Flex>
    </Box>
  );
}

export default HeroSection;
