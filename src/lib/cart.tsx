import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { cartLineSchema, type CartLine } from "./order-schema";

const KEY = "weber-cart-v2";
type Cart = {
  lines: CartLine[];
  count: number;
  add: (id: string, size: string, color: string) => void;
  update: (index: number, patch: Partial<CartLine>) => void;
  remove: (index: number) => void;
  clear: () => void;
};
const CartContext = createContext<Cart | null>(null);
const noop = () => {};
const EMPTY: Cart = { lines: [], count: 0, add: noop, update: noop, remove: noop, clear: noop };

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const parsed = cartLineSchema.array().safeParse(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
      if (parsed.success) setLines(parsed.data);
    } catch { /* ignore broken storage */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, loaded]);

  const add = useCallback((id: string, size: string, color: string) => setLines((ls) => {
    const i = ls.findIndex((l) => l.id === id && !l.chrome && l.size === size && l.color === color);
    if (i < 0) return [...ls, { id, qty: 1, chrome: false, size, color }];
    return ls.map((l, k) => (k === i ? { ...l, qty: Math.min(50, l.qty + 1) } : l));
  }), []);
  const update = useCallback((index: number, patch: Partial<CartLine>) => setLines((ls) => ls.map((l, k) => (k === index ? { ...l, ...patch } : l))), []);
  const remove = useCallback((index: number) => setLines((ls) => ls.filter((_, k) => k !== index)), []);
  const clear = useCallback(() => setLines([]), []);
  const value = useMemo(() => ({ lines, count: lines.reduce((s, l) => s + l.qty, 0), add, update, remove, clear }), [lines, add, update, remove, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  // A hot-reloaded page can briefly render before the provider; show an empty cart instead of crashing.
  return useContext(CartContext) ?? EMPTY;
}
