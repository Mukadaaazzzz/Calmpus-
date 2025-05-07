import React, { useState, useEffect } from 'react';
import { 
  Box, Avatar, Heading, Text, FormControl, FormLabel, Input, 
  Select, Button, Stack, Spinner, useToast, Link, Divider, 
  Grid, GridItem, useColorModeValue, Icon, Flex 
} from '@chakra-ui/react';
import { FiEdit, FiSave, FiX, FiLogOut, FiUser, FiMapPin, FiInfo, FiSliders } from 'react-icons/fi';
import Header from '../components/Header';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/place.png';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: '',
    address: '',
    gender: '',
    bio: '',
  });
  const toast = useToast();
  const navigate = useNavigate();

  const cardBg = useColorModeValue('white', 'gray.800');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const accentColor = 'teal.500';

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        setLoading(false);
      } else {
        const userId = data.user.id;
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('username, address, gender, bio')
          .eq('id', userId);
          
        if (profileError) {
          toast({
            title: 'Error',
            description: profileError.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        } else if (profileData.length > 0) {
          setProfile(profileData[0]);
        }
        setUser(data.user);
      }
      setLoading(false);
    };
    fetchUser();
  }, [toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert([{ id: user.id, ...profile }]);
      
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setEditing(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getAvatar = () => {
    return profile.username 
      ? `https://ui-avatars.com/api/?name=${profile.username}&background=random` 
      : defaultAvatar;
  };

  if (loading) {
    return (
      <>
        <Header />
        <Flex minH="100vh" align="center" justify="center">
          <Box textAlign="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" color={accentColor} />
            <Text mt={4} fontSize="lg" color="gray.500">Loading your profile...</Text>
          </Box>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box maxW="3xl" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        <Box 
          bg={cardBg}
          borderRadius="2xl"
          boxShadow="xl"
          p={8}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            h: '2px',
            bgGradient: 'linear(to-r, teal.400, blue.400)'
          }}
        >
          <Flex direction="column" align="center" mb={8}>
            <Avatar 
              size="2xl" 
              src={getAvatar()} 
              mb={4}
              border="4px solid"
              borderColor="white"
              boxShadow="lg"
            />
            <Heading size="xl" mb={2}>
              {profile.username || 'Anonymous User'}
            </Heading>
            <Text color="gray.500">{profile.bio || 'No bio yet'}</Text>
          </Flex>

          {!user ? (
            <Box textAlign="center" py={8}>
              <Text fontSize="xl" color="gray.500" mb={6}>
                Join our community to unlock personalized features
              </Text>
              <Button 
                as={Link}
                href="/signin"
                colorScheme="teal"
                size="lg"
                rightIcon={<FiUser />}
                px={8}
              >
                Get Started
              </Button>
            </Box>
          ) : editing ? (
            <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={6}>
              <FormControl>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={FiUser} mr={2} /> Username
                </FormLabel>
                <Input
                  bg={inputBg}
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={FiMapPin} mr={2} /> Address
                </FormLabel>
                <Input
                  bg={inputBg}
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={FiSliders} mr={2} /> Gender
                </FormLabel>
                <Select
                  bg={inputBg}
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel display="flex" alignItems="center">
                  <Icon as={FiInfo} mr={2} /> Bio
                </FormLabel>
                <Input
                  bg={inputBg}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </FormControl>

              <GridItem colSpan={{ md: 2 }}>
                <Flex justify="flex-end" gap={4} mt={6}>
                  <Button 
                    leftIcon={<FiSave />} 
                    colorScheme="teal"
                    onClick={handleUpdateProfile}
                    px={8}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    leftIcon={<FiX />} 
                    variant="outline"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          ) : (
            <Stack spacing={6}>
              <Box>
                <InfoItem icon={FiUser} label="Username" value={profile.username} />
                <InfoItem icon={FiMapPin} label="Address" value={profile.address} />
                <InfoItem icon={FiSliders} label="Gender" value={profile.gender} />
                <InfoItem icon={FiInfo} label="Bio" value={profile.bio} />
              </Box>

              <Divider />

              <Flex justify="space-between">
                <Button 
                  leftIcon={<FiEdit />} 
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </Button>
                <Button 
                  leftIcon={<FiLogOut />} 
                  colorScheme="red"
                  variant="ghost"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </Flex>
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <Flex align="center" p={3} borderRadius="lg" _hover={{ bg: 'gray.50' }}>
    <Icon as={icon} boxSize={5} color="teal.500" mr={3} />
    <Box>
      <Text fontSize="sm" color="gray.500">{label}</Text>
      <Text fontWeight="medium">{value || 'Not provided'}</Text>
    </Box>
  </Flex>
);

export default ProfilePage;