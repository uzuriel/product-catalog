type ProductCardProps = {
  imageUrl: string;
  name: string;
  description?: string;
  price: number;
};

const ProductCard = ({
  imageUrl,
  name,
  description,
  price,
}: ProductCardProps) => {
  return (
    <div className="card bg-primary-content w-96 h-full shadow-sm">
      <figure>
        <img src={imageUrl} alt={name} />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p>{description}</p>
        <div className="card-actions justify-between">
          <h3 className="font-bold">₱{price}</h3>
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
