import React from "react";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
  const { resdata } = props;
  const { name, image, price, id } = resdata;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <article
      className="relative m-4 p-6 w-[230px] h-[450px] border border-solid border-black bg-gray-100 flex flex-col justify-between rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="m">
        <div className="w-40 h-60">
          <img className="w-40 h-56" src={image} alt="Thumbnail" />
        </div>
        <h1 className="m font-bold text-lg">{name}</h1>
        <h1>{price}</h1>
      </div>
    </article>
  );
};



export default Card;
