import React, { useState, useEffect } from "react";
import { Box, Text, Grid, Image, Button, Input, Select, IconButton } from "@chakra-ui/react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

const productsData = {
  "Phones & Tablets": [
    { id: 1, name: "iPhone 12", price: "₦639,200", image: "/iphone12.jpg" }, // $799 * 800 = ₦639,200
    { id: 2, name: "Samsung Galaxy S21", price: "₦559,200", image: "/samsung.jpg" }, // $699 * 800 = ₦559,200
  ],
  Fashion: [
    { id: 3, name: "Men's Dress", price: "₦39,200", image: "/jacket.png" }, // $49 * 800 = ₦39,200
    { id: 4, name: "Women's Dress", price: "₦47,200", image: "/dress.png" }, // $59 * 800 = ₦47,200
  ],
  Electronics: [
    { id: 5, name: "Sony TV", price: "₦799,200", image: "/tv.png" }, // $999 * 800 = ₦799,200
    { id: 6, name: "Dell Laptop", price: "₦639,200", image: "/laptop.png" }, // $799 * 800 = ₦639,200
  ],
  Gaming: [
    { id: 7, name: "PlayStation 5", price: "₦399,200", image: "/ps5.jpg" }, // $499 * 800 = ₦399,200
    { id: 8, name: "Xbox Series X", price: "₦399,200", image: "/xbox.jpg" }, // $499 * 800 = ₦399,200
  ],
};

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const goToWishlist = () => {
    navigate("/wishlist");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const allProducts = Object.values(productsData).flat();

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || productsData[selectedCategory].includes(product);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <Box p={3} minH="100vh" paddingBottom="85px">
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            width="60%"
            bg="white"
          />
          <Select width="35%" onChange={handleCategoryChange} bg="white">
            <option value="All">All Products</option>
            <option value="Phones & Tablets">Phones & Tablets</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Gaming">Gaming</option>
          </Select>
        </Box>

       <Grid templateColumns="repeat(auto-fill, minmax(6rem, 1fr))" gap={3}>

          {filteredProducts.map((product) => (
            <Box key={product.id} bg="white" p={4} borderRadius="md" boxShadow="md">
              <Image src={product.image} alt={product.name} mb={4} />
              <Text fontWeight="bold">{product.name}</Text>
              <Text>{product.price}</Text>
              <Box mt={2} display="flex" justifyContent="space-between">
                <IconButton
                  aria-label="Add to wishlist"
                  icon={<FaHeart />}
                  bg="transparent"
                  _hover={{ color: wishlist.find((item) => item.id === product.id) ? "red.500" : "gray.500" }}
                  onClick={() => toggleWishlist(product)}
                  color={wishlist.find((item) => item.id === product.id) ? "red.500" : "gray.500"}
                />
                <IconButton
                  aria-label="Add to cart"
                  icon={<FaShoppingCart />}
                  bg="transparent"
                  _hover={{ color: "green.500" }}
                  onClick={() => addToCart(product)}
                />
              </Box>
            </Box>
          ))}
        </Grid>

        <Box mt={8} display="flex" justifyContent="space-between">
          <Button onClick={goToWishlist} colorScheme="blue">
            Go to Wishlist ({wishlist.length})
          </Button>
          <Button onClick={goToCart} colorScheme="green">
            Go to Cart ({cart.length})
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CategoryPage;
