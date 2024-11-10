import qs from "query-string";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  sizeId?: string;
  flavorId?: string;
  isFeatured?: boolean;
  billboardId?: string; 
}
const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      flavorId: query.flavorId,
      isFeatured: query.isFeatured,
      //...(query.billboardId && { billboardId: query.billboardId }), // Solo agregar si existe
      billboardId: query.billboardId,
    },
  });

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include', // Agregar esta línea
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al obtener productos");
    }

    return res.json();
  } catch (error: any) {
    console.error("Error al recuperar productos:", error.message);
    return [];
  }
};

export default getProducts;
