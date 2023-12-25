/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Image from "next/image";
type Props = {
  data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
};

const TypeProject = (props: Props) => {
  const { data, handleUpdateData, index, type, checkFocus } = props;
  const [itemFocus, setItemFocus] = useState<any>(-1);
  const handleUpdateTimeStart = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    if (newData?.moreCvProjects?.[i]?.time?.includes("-")) {
      let mang = newData.moreCvProjects[i].time?.split("-");
      newData.moreCvProjects[i].time = `${e.target.value}-${mang[1]}`;
    } else {
      newData.moreCvProjects[i].time = `${e.target.value}-`;
    }

    handleUpdateData(newData, type, index);
  };
  const handleTime = (dataTime: any) => {
    let mang = dataTime?.split("-");
    return mang;
  };
  const handleMoveItem = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    const dt = newData?.moreCvProjects.splice(i, 1);
    switch (e) {
      case "up":
        newData?.moreCvProjects.splice(i - 1, 0, dt?.[0]);
        setItemFocus(i - 1);
        break;

      case "down":
        newData?.moreCvProjects.splice(i + 1, 0, dt?.[0]);
        setItemFocus(i + 1);

        break;
    }
    handleUpdateData(newData, type, index);
  };
  const handleCheckBtn = (name: any, i: any) => {
    const dt = JSON.parse(JSON.stringify(data?.moreCvProjects));
    if (dt?.length > 1) {
      switch (name) {
        case "up":
          if (i === 0) {
            return false;
          } else {
            return true;
          }
          break;
        case "down":
          if (i === dt.length - 1) {
            return false;
          } else {
            return true;
          }
          break;
        default:
          return true;
      }
    } else {
      return false;
    }
  };
  const handleUpdateTimeEnd = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    if (newData?.moreCvProjects?.[i]?.time?.includes("-")) {
      let mang = newData.moreCvProjects[i].time?.split("-");
      newData.moreCvProjects[i].time = `${mang[0]}-${e.target.value}`;
    } else {
      newData.moreCvProjects[i].time = `-${e.target.value}`;
    }
    handleUpdateData(newData, type, index);
  };
  const handleChange = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data.moreCvProjects));
    newData[i] = { ...newData[i], [e.target.name]: e.target.value };
    const dataReq = { ...data, moreCvProjects: newData };
    handleUpdateData(dataReq, type, index);
  };
  const handleDelete = (i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    newData?.moreCvProjects.splice(i, 1);
    handleUpdateData(newData, type, index);
  };
  return (
    <div className="mx-[-10px]">
      <div className=" flex mb-6 items-center ">
        <div className="h-[1px] w-8 bg-yellow-500"></div>
        <div
          contentEditable
          placeholder=" MỤC TIÊU NGHỀ NGHIỆP"
          className="border-[1px] rounded-xl text-sm font-bold w-fit min-w-[5rem] border-yellow-500 outline-none p-1 break-words max-w-[15rem]"
        >
          DỰ ÁN
        </div>
        <div className="h-[1px] flex-1 bg-yellow-500"></div>
      </div>
      <ul className="flex flex-col gap-y-2">
        {data?.moreCvProjects?.map((dt: any, i: any) => {
          return (
            <li className=" relative">
              <div
                className={`pl-8 pr-4 flex flex-col gap-y-2   border-[1px] border-dashed ${
                  type === 0 ? "border-white " : "border-black "
                } ${
                  itemFocus === i && checkFocus
                    ? type === 0
                      ? "hover:border-white "
                      : "hover:border-black "
                    : "border-transparent"
                }
                
                `}
                onClick={() => {
                  setItemFocus(i);
                }}
              >
                <div className="flex gap-x-3">
                  <input
                    type="text"
                    defaultValue={dt?.position}
                    name="position"
                    onChange={(e: any) => handleChange(e, i)}
                    className={`font-medium flex-1 bg-transparent text-xs outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed 
                    ${
                      type === 0
                        ? "hover:border-white/30 "
                        : "hover:border-black/30 "
                    }
                    `}
                    placeholder="Vị trí trong dự án"
                  />
                  <span>//</span>
                  <div className="flex">
                    <input
                      type="text"
                      defaultValue={handleTime(dt?.time)?.[0]}
                      onChange={(e: any) => {
                        handleUpdateTimeStart(e, i);
                      }}
                      className={`font-medium w-full text-xs bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed 
                      ${
                        type === 0
                          ? "hover:border-white/30 "
                          : "hover:border-black/30 "
                      }
                      `}
                      placeholder="Bắt đầu"
                    />
                    <span>-</span>
                    <input
                      type="text"
                      defaultValue={handleTime(dt?.time)?.[1]}
                      onChange={(e: any) => {
                        handleUpdateTimeEnd(e, i);
                      }}
                      className={`font-medium w-full text-xs bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed 
                      ${
                        type === 0
                          ? "hover:border-white/30 "
                          : "hover:border-black/30 "
                      }`}
                      placeholder="Kết thúc"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  defaultValue={dt?.participant}
                  name="participant"
                  onChange={(e: any) => handleChange(e, i)}
                  className={`font-medium w-full text-xs outline-none bg-transparent border-[1px] border-transparent hover:border-black/30 focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed 
                  ${
                    type === 0
                      ? "hover:border-white/30 "
                      : "hover:border-black/30 "
                  }
                  `}
                  placeholder="Tên dự án"
                />
                <input
                  type="text"
                  defaultValue={dt?.functionality}
                  name="functionality"
                  onChange={(e: any) => handleChange(e, i)}
                  className={`font-medium w-full text-xs outline-none bg-transparent border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed 
                  ${
                    type === 0
                      ? "hover:border-white/30 "
                      : "hover:border-black/30 "
                  }
                  `}
                  placeholder="Mô tả dự án"
                />
                <input
                  type="text"
                  defaultValue={dt?.technology}
                  name="technology"
                  onChange={(e: any) => handleChange(e, i)}
                  className={`font-medium w-full text-xs bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed 
                  ${
                    type === 0
                      ? "hover:border-white/30 "
                      : "hover:border-black/30 "
                  }`}
                  placeholder="Công nghệ sử dụng trong dự án"
                />
              </div>
              <div
                className={`absolute -top-8 flex  gap-x-1 right-0 ${
                  itemFocus === i && checkFocus ? "" : "hidden"
                }`}
              >
                <button
                  className={` bg-white rounded-md w-7 h-7 border-2 ${
                    handleCheckBtn("up", i) ? "" : "hidden"
                  }`}
                  onClick={(e: any) => {
                    handleMoveItem("up", i);
                  }}
                >
                  <div className="p-2">
                    <Image
                      className="pointer-events-none"
                      src={"/iconup.svg"}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </div>
                </button>
                <button
                  className={` bg-white rounded-md w-7 h-7 border-2 ${
                    handleCheckBtn("down", i) ? "" : "hidden"
                  }`}
                  onClick={(e: any) => {
                    handleMoveItem("down", i);
                  }}
                >
                  <div className="p-2">
                    <Image
                      className="pointer-events-none"
                      src={"/icondown.svg"}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </div>
                </button>
                <button
                  className={` bg-white rounded-md w-7 h-7 border-2 ${
                    handleCheckBtn("delete", i) ? "" : "hidden"
                  }`}
                  onClick={(e: any) => {
                    handleDelete(i);
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TypeProject;
