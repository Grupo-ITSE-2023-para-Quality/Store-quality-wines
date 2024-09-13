import { Billboard, Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<{ billboard: Billboard, products: Product[] }> => {
  const res = await fetch(`${URL}/${id}`);
  return res.json(); // Devuelve tanto el billboard como los productos
};

export default getBillboard;