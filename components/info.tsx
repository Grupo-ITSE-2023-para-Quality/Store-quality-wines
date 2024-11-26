"use client"; // Asegúrate de que esto esté en la parte superior del archivo

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onAddToCart = () => {
    if (data?.inStock && data?.stock > 0) {
      cart.addItem(data, 1);
    }
  };

  const getStockIndicator = () => {
    if (!data?.inStock)
      return { color: "bg-gray-400", text: "Stock no disponible" };
    if (data?.stock <= 3) {
      return {
        color: "bg-red-500",
        text: `Últimos ${data?.stock} en stock`,
      };
    }
    if (data?.stock <= 5) {
      return {
        color: "bg-orange-500",
        text: `${data?.stock} disponibles`,
      };
    }
    return { color: "bg-green-500", text: `${data?.stock} disponibles` };
  };

  const stockIndicator = getStockIndicator();

  // Solo renderiza el contenido si el componente está montado
  if (!isMounted) {
    return null; // O un spinner de carga si lo prefieres
  }

  return (
    <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <Currency value={data?.price} />
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        {data?.description && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Descripción:</h3>
            <span>{data.description}</span>
          </div>
        )}
        {data?.size?.name && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Presentación:</h3>
            <span>{data.size.name}</span>
          </div>
        )}
        {data?.flavor?.name && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Variedad:</h3>
            <span>{data.flavor.name}</span>
          </div>
        )}
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${stockIndicator.color}`}
            ></span>
            <span>{stockIndicator.text}</span>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className={`flex items-center gap-x-2 ${
            data?.inStock ? "" : "cursor-not-allowed bg-gray-400"
          }`}
          disabled={!data?.inStock}
        >
          {data?.inStock ? "Agregar al carrito" : "No se encontró stock"}
          {data?.inStock && <ShoppingCart />}
        </Button>
      </div>
    </div>
  );
};

export default Info;