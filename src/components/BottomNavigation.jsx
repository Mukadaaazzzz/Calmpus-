import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiHeart, FiShoppingBag, FiGrid } from 'react-icons/fi';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';

const BottomNavigation = () => {
  const [currentTab, setCurrentTab] = useState('');

  const bottomTabs = [
    { title: 'Home', url: '/', Icon: FiHome },
    { title: 'Collections', url: '/collections', Icon: FiGrid },
    { title: 'Cart', url: '/cart', Icon: FiShoppingBag },
    { title: 'Wishlist', url: '/wishlist', Icon: FiHeart },
    { title: 'Profile', url: '/Profile', Icon: FiUser },
  ];

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="white"
      zIndex="50"
      display={{ base: 'flex', md: 'none' }}  // Hide on larger screens
      justifyContent="space-around"
      py={2}
      boxShadow="0 -15px 20px rgba(0, 0, 0, 0.10)"
    >
      {bottomTabs.map((tab, index) => (
        <Link
          key={index}
          to={tab.url}
          onClick={() => setCurrentTab(tab.url)}
        >
          <Flex
            direction="column"
            align="center"
            color={currentTab === tab.url ? 'purple.600' : 'gray.500'}
            _hover={{ color: 'purple.600' }}
          >
            <IconButton
              aria-label={tab.title}
              icon={<tab.Icon size="24px" />}
              variant="ghost"
            />
            <Text fontSize="xs" mt={1}>{tab.title}</Text>
          </Flex>
        </Link>
      ))}
    </Box>
  );
};

export default BottomNavigation;
