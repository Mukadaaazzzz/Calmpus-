import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from './supabaseClient';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const user = supabase.auth.user();
    if (user) {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching wishlist:', error);
      } else {
        setWishlist(data.map(item => item.product_id));
      }
    }
  };

  const addToWishlist = async (productId) => {
    const user = supabase.auth.user();
    if (user) {
      const { error } = await supabase
        .from('wishlist')
        .insert({ user_id: user.id, product_id: productId });

      if (error) {
        console.error('Error adding to wishlist:', error);
      } else {
        setWishlist([...wishlist, productId]);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    const user = supabase.auth.user();
    if (user) {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from wishlist:', error);
      } else {
        setWishlist(wishlist.filter(id => id !== productId));
      }
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};