import React from "react";
import { assets, plans } from "../assets/assets";

const BuyCredit = () => {
  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <button className="border border-gray-500 px-10  py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-800 to-transparent bg-clip-text text-transparent mb-10">
        Choose the plan rights for you
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg px-8 py-12 text-gray-700 hover:scale-105 transition-all duration-500"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span>/{item.credits} Credits
            </p>
            <button className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
