import { NavLink } from "react-router";
import type { ProductCardProps } from "~/types";

const ProductCard = ({
  productId,
  imageUrl,
  name,
  description,
  price,
}: ProductCardProps) => {
  return (
    <NavLink to={`/products/${productId}`} end>
      <div className="card bg-primary max-w-80 sm:w-96 md:w-80 lg:w-96 xl:w-80 2xl:w-80 3xl:w-96 h-96 shadow-sm">
        <figure className="bg-primary-content max-w-80 sm:w-96 md:w-80 lg:w-96 xl:w-80 2xl:w-80 3xl:w-96 h-64 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body gap-4">
          <h3 className="card-title text-primary-content">{name}</h3>
          <p className="text-primary-content text-justify line-clamp-2">
            {description}
          </p>
          <h3 className="font-bold text-highlight-gold">
            ₱{price.toLocaleString()}
          </h3>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
