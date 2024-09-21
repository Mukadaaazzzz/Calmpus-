import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Box, Button, Input, VStack, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Header />
    <Box bg="gray.50" minH="100vh" py={10} px={5} d="flex" justifyContent="center" alignItems="center">
      <VStack spacing={6} bg="white" p={10} boxShadow="xl" borderRadius="md">
        <Heading color="purple.600">Welcome to Calmpus!</Heading>
        <Text fontSize="lg" color="gray.500">Create your account</Text>

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

        <Button colorScheme="purple" size="lg" width="full" onClick={handleSignUp}>
          Sign Up
        </Button>

        <Text color="gray.500">
          Already have an account?{' '}
          <Button variant="link" color="purple.500" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
        </Text>
      </VStack>
    </Box>
    </>
  );
};

export default SignUp;
