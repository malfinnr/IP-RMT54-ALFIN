import { getAccessToken, getUserLogin } from "../helpers/CredentialToken";
import { Link, useNavigate } from "react-router-dom";
import love from "../assets/heart.png";
import pencil from "../assets/pencil.png";
import apiHelps from "../helpers/ApiHelps";

const CardProduct = ({ product, onClickLike }) => {
  const accessToken = getAccessToken();

  const navigate = useNavigate();

  const userData = getUserLogin();

  const handleNavigateDetail = () => {
    navigate(`/detail-products/${product.id}`);
  };

  const handleLikes = async () => {
    try {
      const response = await apiHelps.post(
        `/likes/${product.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      // window.location.reload(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="box-dark-brown rounded-[18px] bg-light-brown p-2 h-full w-full">
      <div className="border-2 border-warm-brown rounded-2xl bg-peach h-full relative flex flex-col">
        {accessToken ? (
          <div className="absolute -top-5 -right-5 z-10">
            <button
              onClick={handleLikes}
              className="border-2 border-warm-brown box-dark-brown w-12 h-12 flex items-center justify-center rounded-full bg-creamy-beige hover:scale-105 active:scale-100"
            >
              <img className="w-6 h-auto" src={love} alt="" />
            </button>
          </div>
        ) : null}
        {userData && product?.User?.email === userData.email ? (
          <div className="absolute -left-5 -top-5 z-10">
            <Link
              to={`/edit-products/${product.id}`}
              className="border-2 border-warm-brown box-dark-brown w-12 h-12 flex items-center justify-center rounded-full bg-creamy-beige hover:scale-105 active:scale-100"
            >
              <img className="w-6 h-auto" src={pencil} alt="" />
            </Link>
          </div>
        ) : null}
        <div className="bg-pale-mint h-80 rounded-t-2xl overflow-hidden">
          <img
            alt={product.name}
            src={product.image}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-dark-brown text-xl font-semibold line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-warm-brown line-clamp-3">
            {product.description}
          </p>
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-base font-medium text-dark-brown">
              {product.Category.name}
            </p>
            <p className="text-base font-medium text-dark-brown">
              {product.totalLikes} likes
            </p>
            <p
              className="text-base font-medium text-dark-brown cursor-pointer"
              onClick={handleNavigateDetail}
            >
              See Detail
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
