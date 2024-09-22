import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Box, Button, Input, VStack, Heading, Text, Alert, AlertIcon, InputGroup, InputRightElement, IconButton 
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; // Importing icons for show/hide password
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate('/profile');
    }
  };

  return (
    <>
      <Header />
      <Box bg="gray.50" minH="100vh" py={10} px={5} display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={6} bg="white" p={10} boxShadow="xl" borderRadius="md">
          <Heading color="purple.600">Welcome Back to Calmpus!</Heading>
          <Text fontSize="lg" color="gray.500">Sign in to continue your journey.</Text>

          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          {/* Email Input */}
          <Input
            placeholder="Email"
            variant="filled"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            _focus={{ borderColor: "purple.500" }}
          />

          {/* Password Input with Show/Hide Icon */}
          <InputGroup size="lg">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"} // Conditionally change input type
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              _focus={{ borderColor: "purple.500" }}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                variant="ghost"
                color="gray.500"
              />
            </InputRightElement>
          </InputGroup>

          {/* Sign In Button */}
          <Button colorScheme="purple" size="lg" width="full" onClick={handleSignIn}>
            Sign In
          </Button>

          {/* Sign Up Redirect */}
          <Text color="gray.500">
            Don’t have an account?{' '}
            <Button variant="link" color="purple.500" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default SignIn;
