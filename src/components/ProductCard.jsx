/* eslint-disable react/prop-types */
import { Badge } from '@/components/ui/badge';
import { Rating, ThinStar } from '@smastrom/react-rating';
import { format } from 'date-fns';

import '@smastrom/react-rating/style.css';

// Declare it outside your component so it doesn't get re-created
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffdf40',
  inactiveFillColor: '#c2c293',
};

const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-full">
        <div>
          <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img className="object-cover w-full object-center" src={product?.image} />
          </a>
        </div>
        <div className="mt-4 px-5 pb-5 flex flex-col h-full">
          <div className="flex-1">
            <p className="text-xs"> {product?.category} </p>
            <p className="flex justify-between items-start">
              <h5 className="text-xl tracking-tight text-neutral-900">{product?.name}</h5>
              <Badge> {product?.brand} </Badge>
            </p>
          </div>
          <div>
            <div className="my-2 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-neutral-900">${product?.price}</span>
                <p className="text-xs">
                  <span className="font-medium mt-1">created at:</span> {format(new Date(product?.creation_date), 'do MMM yyyy')}
                </p>
              </p>
            </div>
            <div className="flex items-center">
              <Rating style={{ maxWidth: 130 }} itemStyles={myStyles} value={product?.ratings} readOnly />
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold"> {product?.ratings} </span>
            </div>
            {/* <a
              href="#"
              className="flex items-center justify-center rounded-md bg-neutral-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-neutral-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
