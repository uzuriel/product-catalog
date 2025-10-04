export type ProductProps = {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
};

export type ProductCardProps = {
  productId: number;
  imageUrl: string;
  name: string;
  description?: string;
  price: number;
};

export type SearchbarProps = {
  value: string;
  onChange: (value: string) => void;
};
