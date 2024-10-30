import { getAccessToken } from "../helpers/CredentialToken";

const CardProduct = ({ product, onClickLike }) => {
  const accessToken = getAccessToken();

  return (
    <div className="box-dark-brown rounded-[18px] bg-light-brown p-2 h-full w-full  cursor-pointer">
      <div className="border-2 border-warm-brown rounded-2xl bg-peach h-full relative flex flex-col">
        {accessToken ? (
          <div className="absolute -top-5 -right-5 z-10">
            <button
              onClick={onClickLike}
              className="border-2 border-warm-brown box-dark-brown w-12 h-12 flex items-center justify-center rounded-full bg-creamy-beige hover:scale-105 active:scale-100"
            >
              <svg
                className="w-6 h-6 text-soft-coral"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
              </svg>
            </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
