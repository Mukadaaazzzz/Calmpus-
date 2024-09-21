import React, { useEffect, useState } from "react";
import { Box, Text, Grid, Image, IconButton } from "@chakra-ui/react";
import Header from "../components/Header";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
        <>
      <Header />
    <Box p={4} paddingBottom="85px">
      <Text fontSize="2xl" mb={4}>Your Wishlist</Text>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <Box key={product.id} bg="white" p={4} borderRadius="md" boxShadow="md">
              <Image src={product.image} alt={product.name} mb={4} />
              <Text fontWeight="bold">{product.name}</Text>
              <Text>{product.price}</Text>
              <IconButton
                aria-label="Remove from wishlist"
                icon={<FaTrash />}
                bg="transparent"
                _hover={{ color: "red.500" }}
                onClick={() => removeFromWishlist(product.id)}
              />
            </Box>
          ))
        ) : (
          <Text>No items in your wishlist</Text>
        )}
      </Grid>
    </Box>
    </>
  );
};

export default Wishlist;
