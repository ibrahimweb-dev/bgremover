import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 ">
      {/* Header left side  */}
      <div>
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove <br className="max-md:hidden" />{" "}
          <span className="bg-gradient-to-b from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Background
          </span>{" "}
          <br className="max-md:hidden" /> from Image for free{" "}
        </h1>
        <p className="my-6 text-[15px] text-gray-500">
          Upload your image and remove background from it easily and{" "}
          <br className="max-sm:hidden" /> quickly
        </p>
        <div>
          <input type="file" name="" id="upload1" hidden />
          <label
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto hover:scale-105 transition-all duration-700"
            htmlFor="upload1"
          >
            <img width={20} src={assets.upload_btn_icon} alt="" />
            <p className="text-white text-sm ">Upload Image</p>
          </label>
        </div>
      </div>
      {/* Header right side  */}
      <div className="w-full max-w-md" >
        <img src={assets.header_img} alt="" />

      </div>
    </div>
  );
};

export default Header;
