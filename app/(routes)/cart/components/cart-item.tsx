"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X, Plus, Minus } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import type { CartItem } from "@/hooks/use-cart"; // Importa CartItem para usarlo en la interfaz

interface CartItemProps {
  data: CartItem; // Cambiado de Product a CartItem
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id, data.quantity); // Elimina completamente el producto
    toast.success(`${data.name} ha sido eliminado del carrito.`);
  };

  const onIncrement = () => {
    cart.addItem(data); // Incrementa la cantidad en 1
  };

  const onDecrement = () => {
    if (data.quantity > 1) {
      cart.removeItem(data.id); // Decrementa la cantidad en 1
    } else {
      onRemove(); // Si la cantidad es 1, elimina el producto
    }
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden">
        <Image
          fill
          src={data?.images?.[0]?.url}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-col justify-between w-full">
        <div className="flex justify-between items-start">
          <p className="text-base font-semibold text-black">{data.name}</p>
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <IconButton onClick={onDecrement} icon={<Minus size={15} />} />
            <p className="text-sm font-medium">{data.quantity}</p>
            <IconButton onClick={onIncrement} icon={<Plus size={15} />} />
          </div>
          <Currency value={data.price * data.quantity} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
