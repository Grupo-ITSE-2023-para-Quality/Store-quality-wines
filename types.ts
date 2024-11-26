export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboardId: string; 
  billboard: Billboard;
};

export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  stock: number;
  inStock: boolean;
  isFeatured: boolean;
  size: Size;
  flavor: Flavor;
  images: Image[];
  billboardId: string;
  billboard: Billboard[];
};

export interface Image {
  id: string;
  url: string;
};

export interface Size {
  id: string;
  name: string;
};

export interface Flavor {
  id: string;
  name: string;
  categoryId: string; 
  category?: Category;
};
