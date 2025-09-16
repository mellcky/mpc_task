import axios from 'axios';
import { Product, CartItem } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch all products or filtered by category
export const getProducts = async (category?: string): Promise<Product[]> => {
  try {
    const params = category ? { category } : {};
    const response = await api.get<Product[]>('/products', { params });
    
    // Ensure variants is always an array and handle potential JSON strings
    return response.data.map(product => ({
      ...product,
      variants: Array.isArray(product.variants) 
        ? product.variants 
        : typeof product.variants === 'string' 
          ? JSON.parse(product.variants) 
          : []
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

// Fetch a single product by ID
export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    const product = response.data;
    
    // Ensure variants is always an array
    return {
      ...product,
      variants: Array.isArray(product.variants) 
        ? product.variants 
        : typeof product.variants === 'string' 
          ? JSON.parse(product.variants) 
          : []
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};

// Get cart items for a given cartId
export const getCartItems = async (cartId: string): Promise<CartItem[]> => {
  try {
    const response = await api.get<CartItem[]>(`/cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    return [];
  }
};

// Add a product to cart
export const addCartItem = async (
  cartId: string,
  productId: number,
  quantity: number = 1
): Promise<CartItem> => {
  try {
    const response = await api.post<CartItem>(`/cart/${cartId}`, { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    throw error;
  }
};

// Remove a product from cart
export const removeCartItem = async (cartId: string, productId: number): Promise<void> => {
  try {
    await api.delete(`/cart/${cartId}/item/${productId}`);
  } catch (error) {
    console.error('Failed to remove item from cart:', error);
    throw error;
  }
};