import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import products from "../types/products.types";
import ShoppingCart from "../components/ShoppingCart";
import { v4 as uuid } from "uuid";
import _, { isNumber } from "lodash";
import { toast } from "react-toastify";
import { LoaderContext } from "./LoaderContext";

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
  createCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  handleOpenedCart: (cartId: CartType["id"]) => void;
  cartItemsQuantity: () => number;
  getItemQuantity(productId: string): number;
  increaseProductQuantity: (product: products, quantity?: number) => void;
  decreaseProductQuantity: (product: products, quantity?: number) => void;
  removeFromCart: (product: products) => void;
  handleTax: (tax: number) => void;
  handleDiscount: (discount: number) => void;
  handleCheckout: () => void;
  isCartEmpty: boolean;
  cartsQuantity: number;
  carts: CartType[];
  openedCart: CartType | null;
  cartSubTotal: number;
  cartTotal: number;
};

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [carts, setCarts] = useLocalStorage<CartType[]>("carts", []);
  const [openedCartId, setOpenedCartId] = useState<string>("");
  const { startLoader, stopLoader } = useContext(LoaderContext);

  const createCart = () => {
    const cartId = uuid();

    const newCard = initialCartValues;

    newCard.id = cartId;

    const cartsHolder = [...carts];
    cartsHolder.push(newCard);

    setCarts(cartsHolder);
    setOpenedCartId(newCard.id);
  };

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const cartsQuantity = carts.length;

  let openedCart = carts.find((cart) => cart.id === openedCartId) || null;

  const isCartEmpty = !openedCart || !openedCart.products.length;

  const cartSubTotal =
    openedCart?.products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0) || 0;

  const cartTotal =
    cartSubTotal -
    cartSubTotal * ((openedCart?.discount || 0) / 100) +
    (openedCart?.tax || 0);

  const handleOpenedCart = (cartId: CartType["id"]) => {
    const cart = carts.find((cart) => cart.id === cartId) || null;

    setOpenedCartId(cart?.id || "");
  };

  const cartItemsQuantity = () => {
    const cart = carts.find((cart) => cart.id === openedCart?.id);

    return (
      cart?.products.reduce((quantity, item) => item.quantity + quantity, 0) ||
      0
    );
  };

  function getItemQuantity(productId: string) {
    const cart = carts.find((cart) => cart.id === openedCart?.id);

    return (
      cart?.products.find((product) => product._id === productId)?.quantity || 0
    );
  }

  const updateCarts = (cart: CartType) => {
    const cartsHolder = [...carts];

    const cartIndex = cartsHolder.findIndex((item) => item.id === cart.id);

    if (cartIndex === -1) {
      cartsHolder.push(cart);
    } else {
      cartsHolder[cartIndex] = cart;
    }

    setCarts(cartsHolder);
  };

  const increaseProductQuantity = (product: products, quantity?: number) => {
    if (!openedCart) {
      toast.error("Please choose a cart to add product.");
      return;
    }

    const cart = { ...openedCart };

    const productItemIndex = cart.products.findIndex(
      (item) => item._id === product._id,
    );

    if (productItemIndex === -1) {
      cart?.products.push({ ...product, quantity: 1 });
    } else {
      const productQuantity = cart.products[productItemIndex].quantity || 0;

      cart.products[productItemIndex].quantity =
        quantity || productQuantity + 1;
    }

    updateCarts(cart);
  };

  const decreaseProductQuantity = (product: products, quantity?: number) => {
    if (!openedCart) {
      toast.error("Please choose a cart.");
      return;
    }

    const cart = { ...openedCart };

    const productItemIndex = cart.products.findIndex(
      (item) => item._id === product._id,
    );

    if (productItemIndex === -1) {
      toast.error("There is no such product");
      return;
    } else {
      const productQuantity = cart.products[productItemIndex].quantity;

      cart.products[productItemIndex].quantity =
        quantity || productQuantity - 1;

      if (cart.products[productItemIndex].quantity <= 0) {
        removeFromCart(product);
        return;
      }
    }

    updateCarts(cart);
  };

  const removeFromCart = (product: products) => {
    if (!openedCart) {
      toast.error("Please choose a cart.");
      return;
    }

    const cart = { ...openedCart };

    const productItemIndex = cart.products.findIndex(
      (item) => item._id === product._id,
    );

    if (productItemIndex === -1) {
      toast.error("There is no such product");
      return;
    } else {
      cart.products.splice(productItemIndex, 1);
      updateCarts(cart);
    }
  };

  const handleTax = (tax: number) => {
    if (!openedCart) {
      toast.error("Please choose a cart.");
      return;
    }

    const cart = { ...openedCart };

    cart.tax = tax;

    updateCarts(cart);
  };

  const handleDiscount = (discount: number) => {
    if (!openedCart) {
      toast.error("Please choose a cart.");
      return;
    }

    const cart = { ...openedCart };

    cart.discount = discount;

    updateCarts(cart);
  };

  const handleCheckout = () => {
    if (!openedCart) {
      toast.error("Please choose a cart.");
      return;
    }

    startLoader();

    setTimeout(() => {
      toast.success("Checkout Succeeded!");
      const cartsHolder = [...carts];

      const cartIndex = cartsHolder.findIndex(
        (item) => item.id === openedCart?.id,
      );

      cartsHolder.splice(cartIndex, 1);

      setCarts(cartsHolder);

      setOpenedCartId("");

      stopLoader();
    }, 4000);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        cartItemsQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeFromCart,
        openCart,
        closeCart,
        createCart,
        handleOpenedCart,
        handleTax,
        handleDiscount,
        handleCheckout,
        isCartEmpty,
        carts,
        cartsQuantity,
        openedCart,
        cartSubTotal,
        cartTotal,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
