import { Flavor } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/flavors`;

const getFlavors = async (): Promise<Flavor[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getFlavors;