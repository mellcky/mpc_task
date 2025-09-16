export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  variants?: Variant[];
}

export interface Variant {
  id: number;
  name: string;
  options: string[];
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  cartId: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  clearCart: () => void;
}