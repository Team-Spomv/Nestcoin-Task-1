import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import products from "../products";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductScreen = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        console.log(data);
        setLoading(false);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <div className="bg-white">
      {loading ? (
        <b>loading</b>
      ) : (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumb &&
                [
                  { name: "product1", id: 1 },
                  { name: "product2", id: 2 },
                ].map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <Link
                        to={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </Link>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-4 h-5 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <div
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </div>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">{product.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <i
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0 fas fa-star"
                        )}
                        aria-hidden="true"
                      ></i>
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductScreen;
