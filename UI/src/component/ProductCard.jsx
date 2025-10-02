import { useContext } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import Products from "./Products";
import Rating from "./Rating";
const ProductCard = ({ products }) => {
  console.log(products)
  var product ={
    "image":products.imageUrl,
    "name":products.name,
    "price":products.unitPrice,
    "rating":4.0
  }
  // const { addToCart } = useContext(CartContext);
  // let opts = { format: "%s%v", symbol: "€" };
  return (
    
    <div className='productCard__wrapper'>
      <div>
        <img className='productCard__img' src={"/"+product.image} alt='' />
        <h4>{product.name}</h4>
        <div className='ProductCard__price'>
          <h5> ₹ {product.price}</h5>
        </div>
        <div className='ProductCard__Rateing'>
          <Rating
            value="5.0"
            text=" "
            color={"#FFA41C"}
          />
        </div>
        <Link to={`product/${products.id}`}>
        <button
          className='ProductCard__button'
          // onClick={() => addToCart(product)}
        >
          Add to basket
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;