import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import products from "../types/products.types";
import ShoppingCart from "../components/ShoppingCart";
import { v4 as uuid } from "uuid";
import _ from "lodash";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartType = {
  id: string;
  products: (products & { quantity: number })[];
  tax: number;
  discount: number;
};

const initialCartValues: CartType = {
  id: "",
  discount: 0,
  tax: 0,
  products: [],
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity(productId: string): number;
  cartItemsQuantity: () => number;
  createCart: () => void;
  cartsQuantity: number;
  carts: CartType[];
  openedCart: CartType | null;
};

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [carts, setCarts] = useLocalStorage<CartType[]>("carts", []);
  const [openedCart, setOpenedCart] = useState<CartType | null>(null);

  const cartsQuantity = carts.length;

  const cartItemsQuantity = () => {
    const cart = carts.find((cart) => cart.id === openedCart?.id);

    return (
      cart?.products.reduce((quantity, item) => item.quantity + quantity, 0) ||
      0
    );
  };

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  function getItemQuantity(productId: string) {
    const cart = carts.find((cart) => cart.id === openedCart?.id);

    return (
      cart?.products.find((product) => product._id === productId)?.quantity || 0
    );
  }

  const createCart = () => {
    const cartId = uuid();

    const newCard = initialCartValues;

    newCard.id = cartId;

    const cartsHolder = [...carts];
    cartsHolder.push(newCard);

    setCarts(cartsHolder);
    setOpenedCart(newCard);

    console.log(newCard);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        cartItemsQuantity,
        // increaseCartQuantity,
        // decreaseCartQuantity,
        // removeFromCart,
        openCart,
        closeCart,
        createCart,
        carts,
        cartsQuantity,
        openedCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
