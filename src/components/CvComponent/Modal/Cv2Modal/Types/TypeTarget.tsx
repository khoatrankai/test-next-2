import React, { useEffect, useState } from "react";

type Props = {
  data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
};

const TypeTarget = (props: Props) => {
  const { data, handleUpdateData, index, type } = props;

  const handleChange = (e: any) => {
    const dataReq = { ...data, description: e.target.value };
    handleUpdateData(dataReq, type, index);
  };
  return (
    <div className="mx-[-10px]">
      <div className=" flex mb-4 items-center ">
        <div className="h-[1px] w-8 bg-yellow-500"></div>
        <div
          contentEditable
          placeholder=" MỤC TIÊU NGHỀ NGHIỆP"
          className="border-[1px] rounded-xl text-sm font-bold w-fit min-w-[5rem] border-yellow-500 outline-none p-1 break-words max-w-[12rem]"
        >
          MỤC TIÊU NGHỀ NGHIỆP
        </div>
        <div className="h-[1px] flex-1 bg-yellow-500"></div>
      </div>
      <div className="pl-8 pr-4 relative">
        <input
          onChange={handleChange}
          // contentEditable
          defaultValue={data?.description}
          className={` max-w-[10rem] bg-transparent w-full break-words text-xs outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed 
          ${type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "}
          `}
          placeholder="Mục tiêu"
        />
      </div>
    </div>
  );
};

export default TypeTarget;
