import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import CheckType from "./CheckType";
import handleModal from "../utils/handleModal";
// import CvFormPdf from "../../Form/CvFormPdf";

type Props = {
  handleSave: any;
  dataLoad: any;
  handleAddModalCV: any;
};

const Cv3Modal = (props: Props) => {
  const { dataLoad, handleAddModalCV, handleSave } = props;
  const {
    SelectItem,
    checkDrag,
    positionMove,
    positionOver,
    arrayData,
    handleAddItem,
    positionFocus,
    refPdf,
    refType,
    handleCheckFocus,
    setArrayData,
    setPositionFocus,
    handleDeleteTypeCV,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    handleUpdateData,
    handleUpdatePositionFocus,
  } = handleModal({ dataLoad, handleAddModalCV, handleSave });
  const handleTypeOne = (data: any, typeCol: any) => {
    return (
      <div className="col-span-1 min-h-[10rem] flex flex-col">
        {data.map((dt: any, index: any) => {
          return (
            <div
              className={` border-[1px] border-transparent focus-within:border-black/60 pb-8 ${
                positionMove?.type === typeCol && positionMove?.index === index
                  ? "bg-yellow-300"
                  : "bg-transparent"
              } hover:border-black/60 ${
                positionFocus?.type === typeCol &&
                positionFocus?.index === index
                  ? "z-20 bg-white"
                  : ""
              }`}
            >
              <div
                className={`w-full relative `}
                draggable={checkDrag}
                onDragStart={(e: any) => {
                  const crt = document.createElement("div");
                  crt.innerText = dt?.type;
                  crt.style.backgroundColor = "red";
                  crt.style.position = "absolute";
                  crt.style.padding = "4px";
                  crt.style.borderRadius = "10px";

                  crt.style.top = "0px";
                  crt.style.right = "0px";
                  crt.style.zIndex = "-1";
                  crt.style.opacity = "5";
                  e.target.appendChild(crt);

                  e.dataTransfer.setDragImage(crt, 0, 0);
                  e.target.style.cursor = "move";
                  e.dataTransfer.effectAllowed = "default";
                  window.setTimeout(() => {
                    crt.remove();
                  }, 100);
                }}
                onDragEnd={handleDragEnd}
                onDragOver={(e: any) => {
                  e.target.style.cursor = "move";
                  handleDragOver(typeCol, index);
                }}
              >
                <div
                  className=" px-[10px] py-4"
                  onClick={() => {
                    handleUpdatePositionFocus(typeCol, index);
                  }}
                >
                  <CheckType
                    data={dt}
                    type={typeCol}
                    index={index}
                    haneleUpdateData={handleUpdateData}
                    checkFocus={handleCheckFocus(typeCol, index)}
                  />
                </div>
                <div className="absolute -top-10 z-30">
                  <div
                    className={`flex gap-x-1 ${
                      positionFocus?.type === typeCol &&
                      positionFocus?.index === index
                        ? ""
                        : "invisible"
                    }`}
                  >
                    <button
                      className=" bg-white rounded-md w-8 h-8 border-2"
                      onMouseDown={(e: any) => {
                        handleDragStart(typeCol, index);
                      }}
                    >
                      <div className="p-2">
                        <Image
                          className="pointer-events-none select-none"
                          src={"/iconfourway.svg"}
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                    </button>
                    <button
                      className=" bg-white rounded-md w-8 h-8 border-2"
                      onClick={(e: any) => {
                        handleAddItem(typeCol, index);
                      }}
                    >
                      <div className="p-2">
                        <Image
                          className="pointer-events-none"
                          src={"/iconadd.svg"}
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                    </button>
                    <button
                      className=" bg-white rounded-md w-8 h-8 border-2"
                      onClick={(e: any) => {
                        handleDeleteTypeCV(typeCol, index);
                      }}
                    >
                      <div className="p-2">
                        <Image
                          className="pointer-events-none"
                          src={"/icondelete.svg"}
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            // <SelectItem index={index} typeCol={typeCol} dt={dt}>
            //   <CheckType
            //     data={dt}
            //     // type={0}
            //     // index={index}
            //     // haneleUpdateData={handleUpdateData}
            //     // checkFocus={handleCheckFocus(typeCol, index)}
            //   />
            // </SelectItem>
          );
        })}
      </div>
    );
  };
  const handleTypeTwo = (data: any, typeCol: any) => {
    return (
      <div className="col-span-2 min-h-[10rem] flex flex-col ">
        {data.map((dt: any, index: any) => {
          return (
            <div
              className={` border-[1px] border-transparent focus-within:border-black/60 pb-8 ${
                positionMove?.type === typeCol && positionMove?.index === index
                  ? "bg-yellow-300"
                  : "bg-transparent"
              } hover:border-black/60 ${
                positionFocus?.type === typeCol &&
                positionFocus?.index === index
                  ? "z-20 bg-white"
                  : ""
              }`}
            >
              <div
                className={`w-full relative `}
                draggable={checkDrag}
                onDragStart={(e: any) => {
                  const crt = document.createElement("div");
                  crt.innerText = dt?.type;
                  crt.style.backgroundColor = "red";
                  crt.style.position = "absolute";
                  crt.style.padding = "4px";
                  crt.style.borderRadius = "10px";

                  crt.style.top = "0px";
                  crt.style.right = "0px";
                  crt.style.zIndex = "-1";
                  crt.style.opacity = "5";
                  e.target.appendChild(crt);

                  e.dataTransfer.setDragImage(crt, 0, 0);
                  e.target.style.cursor = "move";
                  e.dataTransfer.effectAllowed = "default";
                  window.setTimeout(() => {
                    crt.remove();
                  }, 100);
                }}
                onDragEnd={handleDragEnd}
                onDragOver={(e: any) => {
                  e.target.style.cursor = "move";
                  handleDragOver(typeCol, index);
                }}
              >
                <div
                  className=" px-[10px] py-4"
                  onClick={() => {
                    handleUpdatePositionFocus(typeCol, index);
                  }}
                >
                  <CheckType
                    data={dt}
                    type={typeCol}
                    index={index}
                    haneleUpdateData={handleUpdateData}
                    checkFocus={handleCheckFocus(typeCol, index)}
                  />
                </div>
                <div className="absolute -top-10 z-30">
                  <div
                    className={`flex gap-x-1 ${
                      positionFocus?.type === typeCol &&
                      positionFocus?.index === index
                        ? ""
                        : "invisible"
                    }`}
                  >
                    <button
                      className=" bg-white rounded-md w-8 h-8 border-2"
                      onMouseDown={(e: any) => {
                        handleDragStart(typeCol, index);
                      }}
                    >
                      <div className="p-2">
                        <Image
                          className="pointer-events-none select-none"
                          src={"/iconfourway.svg"}
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                    </button>
                    <button
                      className=" bg-white rounded-md w-8 h-8 border-2"
                      onClick={(e: any) => {
                        handleAddItem(typeCol, index);
                      }}
                    >
                      <div className="p-2">
                        <Image
                          className="pointer-events-none"
                          src={"/iconadd.svg"}
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                    </button>
                    <button
                      className=" bg-white rounded-md w-8 h-8 border-2"
                      onClick={(e: any) => {
                        handleDeleteTypeCV(typeCol, index);
                      }}
                    >
                      <div className="p-2">
                        <Image
                          className="pointer-events-none"
                          src={"/icondelete.svg"}
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className="w-[665px] min-h-[988px]  border-2 relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white"
        ref={refPdf}
      >
        <div
          onClick={() => {
            setPositionFocus({ type: -1, index: -1 });
          }}
          className={`absolute inset-0  ${
            positionFocus?.type != -1 ? "z-10 bg-black/50" : "hidden"
          }`}
        ></div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-10" ref={refType}>
          {arrayData?.map((dt: any, index: any) => {
            if (index === 1) {
              return handleTypeTwo(dt, index);
            }
            return handleTypeOne(dt, index);
          })}
        </div>
      </div>
    </>
  );
};

export default Cv3Modal;
