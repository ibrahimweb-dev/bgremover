import React from "react";
import { assets } from "../assets/assets";

const Upload = () => {
  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-800 to-transparent bg-clip-text text-transparent mb-10">
        See the magic. Try it now
      </h1>
      <div className="text-center mb-16  ">
        <input type="file"  id="upload2" hidden />
        <label
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto hover:scale-105 transition-all duration-700"
          htmlFor="upload2"
        >
          <img width={20} src={assets.upload_btn_icon} alt="" />
          <p className="text-white text-sm ">Upload Image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
