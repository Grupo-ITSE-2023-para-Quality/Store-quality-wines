"use client";
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  
  const onAddToCart = () => {
    if (data?.inStock) {
      cart.addItem(data);
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
    if (data?.quantity <= 5) {
      return {
        color: "bg-orange-500",
        text: `${data?.stock} disponibles`,
      };
    }
    return { color: "bg-green-500", text: `${data?.stock} disponibles` };
  };

  const stockIndicator = getStockIndicator();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <Currency value={data?.price} />
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Descripción:</h3>
          <span>{data?.description || "Información no disponible"}</span>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Presentación:</h3>
          <span>{data?.size?.name || "Información no disponible"}</span>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Variedad:</h3>
          <span>{data?.flavor?.name || "Información no disponible"}</span>
        </div>
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