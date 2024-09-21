import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Box, Button, Input, VStack, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <Box bg="gray.50" minH="100vh" py={10} px={5} d="flex" justifyContent="center" alignItems="center">
      <VStack spacing={6} bg="white" p={10} boxShadow="xl" borderRadius="md">
        <Heading color="purple.600">Welcome Back to Calmpus!</Heading>
        <Text fontSize="lg" color="gray.500">Sign in to continue your journey.</Text>

        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        <Input
          placeholder="Email"
          variant="filled"
          size="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          size="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button colorScheme="purple" size="lg" width="full" onClick={handleSignIn}>
          Sign In
        </Button>

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
