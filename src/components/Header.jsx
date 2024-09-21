import { Box, Flex, Image, IconButton, Link } from '@chakra-ui/react';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useNavigate } from 'react-router-dom';

function Header() {
  // Detect screen size to switch between icons and text for the navigation
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate(); // For navigation

  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      p={0}
      boxShadow="sm"
      bg="white"
      position="relative"
      zIndex="10"
    >
      {/* Logo */}
      <Image
        src="/calm.png"
        alt="Calmpus Logo"
        boxSize={{ base: '120px', md: '140px' }} // Adjust logo size for responsiveness
        onClick={() => navigate("/")}
        cursor="pointer"
      />

      {/* Desktop Navigation: Show Text, Mobile: Show Icons */}
      {isMobile ? (
        // Mobile view with icons
        <Box>
          <IconButton
            icon={<FiShoppingCart size="25px" />}
            aria-label="Cart"
            variant="ghost"
            _hover={{ transform: 'scale(1.1)', transition: '0.3s' }}
            onClick={() => navigate("/cart")}
          />
          <IconButton
            icon={<FiUser size="25px" />}
            aria-label="Account"
            variant="ghost"
            ml={3}
            _hover={{ transform: 'scale(1.1)', transition: '0.3s' }}
            onClick={() => navigate("/profile")}
            marginRight={5}
          />
        </Box>
      ) : (
        // Desktop view with text navigation links
        <Flex as="nav" gap={8} align="center">
          <Link href="/" fontSize="lg" _hover={{ textDecoration: 'underline' }}>
            Home
          </Link>
          <Link href="/collections" fontSize="lg" _hover={{ textDecoration: 'underline' }}>
            Collections
          </Link>
          <Link href="/cart" fontSize="lg" _hover={{ textDecoration: 'underline' }}>
            Cart
          </Link>
          <Link href="/wishlist" fontSize="lg" _hover={{ textDecoration: 'underline' }}>
            Wishlist
          </Link>
          <Link href="/profile" fontSize="lg" _hover={{ textDecoration: 'underline' }} marginRight={10}>
            Profile  
          </Link>
        </Flex>
      )}
    </Flex>
  );
}

export default Header;
