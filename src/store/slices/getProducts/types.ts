export type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  gender: string;
  sizes: Array<{
    id: number;
    name: string;
  }>;
  subCategory: {
    category: {
      id: number;
      name: string;
    };
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  color: {
    id: number;
    name: string;
    colorID: string;
  };
  images: Array<{
    id: number;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type ProductsState = Readonly<{
  success: boolean;
  data: Product[];
  filters: Filters;
}>;

export type Filters = {
  name?: string;
  gender?: string;
  maxPrice: number;
  minPrice: number;
  sizes: string[];
  subcategories?: number[];
  brands: string[];
  colors: string[];
  orderBy?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
  categoryId?: number;
};

export type PayloadFilter = {
  filters?: Partial<Filters>;
};
