"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from "react";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
export interface CartItem {
  id: string; // slug
  _id: string; // CRITICAL: The actual 24-character hex MongoDB ObjectId string
  name: string;
  price: number;
  imageSrc: string;
  quantity: number;
  variant?: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  // For animation: a ref to the cart icon DOM element
  cartIconRef: React.RefObject<HTMLDivElement | null>;
  // Notify that an "add" just happened so the navbar can trigger the badge pulse
  lastAdded: string | null;
}

// ─────────────────────────────────────────────
//  Reducer
// ─────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i._id === action.payload._id);
      const qty = action.payload.quantity ?? 1;
      if (existing) {
        return {
          items: state.items.map((i) =>
            i._id === action.payload._id
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...action.payload, quantity: qty },
        ],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.payload };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "hb_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const cartIconRef = useRef<HTMLDivElement | null>(null);
  const [lastAdded, setLastAdded] = React.useState<string | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "LOAD_CART", payload: parsed });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      dispatch({ type: "ADD_ITEM", payload: item });
      setLastAdded(item.id);
      // Clear the lastAdded flag after a short time so the animation can re-trigger
      setTimeout(() => setLastAdded(null), 1500);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartIconRef,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
