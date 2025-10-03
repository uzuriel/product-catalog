export type ProductProps = {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: Date;
};

export type SearchbarProps = {
  value: string;
  onChange: (value: string) => void;
};
