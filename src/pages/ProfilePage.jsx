import React, { useState, useEffect } from 'react';
import { Box, Avatar, Heading, Text, FormControl, FormLabel, Input, Select, Button, Stack, Spinner, useToast, Link, Divider } from '@chakra-ui/react';
import Header from '../components/Header';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/place.png'; // Neutral placeholder image

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [profile, setProfile] = useState({
    username: '',
    address: '',
    gender: '',
    bio: '',
  });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);  // Start loading spinner
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
      setLoading(false);  // End loading spinner
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const handleUpdateProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert([{ id: user.id, ...profile }]);
      if (error) {
        throw error;
      }
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setEditing(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const getAvatar = () => {
    return profile.username 
      ? `https://ui-avatars.com/api/?name=${profile.username}` 
      : defaultAvatar;
  };

  if (loading) {
    return (
          <>
    <Header />
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        <Text mt={4} fontSize="lg">Loading your profile...</Text>
      </Box>
      </>
    );
  }

  return (
    <>
    <Header />
    <Box 
      maxW={{ base: "95%", md: "80%", lg: "60%" }} 
      mx="auto" 
      p={6} 
      mt={10} 
      bg="gray.50" 
      boxShadow="lg" 
      borderRadius="lg"
      textAlign="center"
      transition="all 0.3s"
      paddingBottom="95px"
    >
      <Heading as="h1" size="xl" mb={6} color="teal.500">
        {user ? `Hey ${profile.username}! Ready to explore? 🎉` : "Welcome to Calmpus!"}
      </Heading>

      {!user ? (
        <Box>
          <Text fontSize="lg" color="gray.500" mb={4}>
            Join the Calmpus community today and personalize your shopping experience!
          </Text>
          <Link href="/signin" color="blue.500" fontSize="lg" fontWeight="bold">
            Sign In Now!
          </Link>
        </Box>
      ) : (
        <Box textAlign="center">
          <Avatar size="2xl" src={getAvatar()} mb={6} mx="auto" />
          
          {editing ? (
            <Stack spacing={4} textAlign="left" mt={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input 
                  type="text" 
                  value={profile.username} 
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })} 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input 
                  type="text" 
                  value={profile.address} 
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })} 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select 
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
                <FormLabel>Bio</FormLabel>
                <Input 
                  type="text" 
                  value={profile.bio} 
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleUpdateProfile} mt={4}>
                Save Changes
              </Button>
              <Button colorScheme="gray" onClick={() => setEditing(false)} mt={4}>
                Cancel
              </Button>
            </Stack>
          ) : (
            <Stack spacing={4}>
              <Text fontSize="lg">
                Username: <strong>{profile.username || 'Not Provided'}</strong>
              </Text>
              <Text fontSize="lg">
                Address: <strong>{profile.address || 'Not Provided'}</strong>
              </Text>
              <Text fontSize="lg">
                Gender: <strong>{profile.gender || 'Not Provided'}</strong>
              </Text>
              <Text fontSize="lg">
                Bio: <strong>{profile.bio || 'Not Provided'}</strong>
              </Text>
              <Button colorScheme="teal" onClick={() => setEditing(true)} mt={4}>
                Edit Profile
              </Button>
              <Divider />
              <Button colorScheme="red" onClick={handleSignOut} mt={4}>
                Sign Out
              </Button>
            </Stack>
          )}
        </Box>
      )}
    </Box>
    </>
  );
};

export default ProfilePage;
