export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
};

export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  flavor: Flavor;
  images: Image[];
};

export interface Image {
  id: string;
  url: string;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Flavor {
  id: string;
  name: string;
  categoryId: string; 
  category?: Category;
};
