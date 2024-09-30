import React, { useEffect, useState } from "react";
import { Box, Button, Text, Grid, Image } from "@chakra-ui/react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Calculate total price
    const calculatedTotal = storedCart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity;
      return sum + price;
    }, 0);
    
    setTotal(calculatedTotal);
  }, []);

  const handlePayment = () => {
    alert("Please send payment evidence on WhatsApp after transfer.");
    localStorage.removeItem("cart");
    navigate("/thank-you");
  };

  return (
    <>
      <Header />
      <Box p={4} bg="gray.50" minH="100vh" paddingBottom="85px">
        <Text fontSize="2xl" mb={6} fontWeight="bold">Checkout</Text>

        {cartItems.length > 0 ? (
          <Grid templateColumns="repeat(1, 1fr)" gap={6}>
            {cartItems.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" p={4} boxShadow="md" bg="white" borderRadius="md">
                <Image src={item.image} alt={item.name} boxSize="100px" mr={4} />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                  <Text>{item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        ) : (
          <Text>No items in cart.</Text>
        )}

        {/* Total Price */}
        <Box mt={8} p={4} bg="white" boxShadow="md" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">Total: ₦{total.toFixed(2)}</Text>
        </Box>

        {/* Confirm Button */}
        <Box mt={8} textAlign="center">
          <Button colorScheme="green" size="lg" onClick={handlePayment}>
            Confirm Payment
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutPage;
