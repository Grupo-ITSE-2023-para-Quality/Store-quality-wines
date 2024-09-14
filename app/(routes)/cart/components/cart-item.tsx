"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
    toast.success(`${data.name} ha sido eliminado del carrito.`);
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
        <Currency value={data.price} />
      </div>
    </li>
  );
};

export default CartItem;
