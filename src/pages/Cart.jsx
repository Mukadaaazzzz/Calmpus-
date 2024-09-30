import React, { useEffect, useState } from "react";
import { Box, Text, Grid, Image, Button, Input, IconButton } from "@chakra-ui/react";
import Header from "../components/Header";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Extract numeric value from price
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate("/check"); // Navigate to the checkout page
  };

  return (
    <>
      <Header />
      <Box p={4} paddingBottom="85px">
        <Text fontSize="2xl" mb={4}>Your Cart</Text>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {cart.length > 0 ? (
            cart.map((product) => (
              <Box key={product.id} bg="white" p={4} borderRadius="md" boxShadow="md">
                <Image src={product.image} alt={product.name} mb={4} />
                <Text fontWeight="bold">{product.name}</Text>
                <Text>{product.price}</Text>
                <Input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                />
                <IconButton
                  aria-label="Remove from cart"
                  icon={<FaTrash />}
                  bg="transparent"
                  _hover={{ color: "red.500" }}
                  onClick={() => removeFromCart(product.id)}
                />
              </Box>
            ))
          ) : (
            <Text>No items in your cart</Text>
          )}
        </Grid>
        {cart.length > 0 && (
          <Box mt={4}>
            <Text fontWeight="bold">Total: NGN{calculateTotalPrice()}</Text>
            <Button colorScheme="green" mt={2} onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Cart;
