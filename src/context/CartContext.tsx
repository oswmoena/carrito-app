import { FC } from 'react';
import { createContext, useState } from 'react';

const cart = {
  items: { products: [], totalPrice: 0 },
  setItems: (items: any) => {},
};

export const CartContext = createContext(cart);

export const CartProvider: FC = ({ children }) => {
  const [items, setItems] = useState(cart.items);

  return <CartContext.Provider value={{ items, setItems }}>{children}</CartContext.Provider>;
};
