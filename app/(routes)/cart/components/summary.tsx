"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Pedido confirmado");
      removeAll();
    }

    if (searchParams.get("cancelado")) {
      toast.error("Algo salió mal");
    }
  }, [searchParams, removeAll]);

  // Corrige el cálculo del precio total considerando la cantidad
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900">Resumen</h2>
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-gray-900">A pagar</p>
          <Currency value={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
