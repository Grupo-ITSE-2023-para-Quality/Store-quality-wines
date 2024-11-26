import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";
import { toast } from "react-hot-toast";
import getProducts from "@/actions/get-products";

interface CartItem extends Product {
  quantity: number;
}

export type { CartItem };

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, quantity?: number) => void;
  removeItem: (id: string, quantity?: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: async (data: Product, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        const products = await getProducts({}); // Obtener productos actualizados
        const product = products.find(item => item.id === data.id);

        if (!product || product.stock < quantity) {
          toast.error(`Stock insuficiente para ${data.name}`);
          return;
        }
        
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity > data.stock) {
            toast.error(`Stock insuficiente para ${data.name}`);
            return;
          }
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
        } else {
          if (quantity > data.stock) {
            toast.error(`Stock insuficiente para ${data.name}`);
            return;
          }
          set({
            items: [...currentItems, { ...data, quantity }],
          });
        }
        toast.success("Producto añadido al carrito");
      },
      removeItem: (id: string, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);

        if (!existingItem) return;

        const newQuantity = existingItem.quantity - quantity;
        if (newQuantity > 0) {
          set({
            items: currentItems.map((item) =>
              item.id === id ? { ...item, quantity: newQuantity } : item
            ),
          });
        } else {
          set({
            items: currentItems.filter((item) => item.id !== id),
          });
        }
        toast.success("Producto actualizado en el carrito");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;