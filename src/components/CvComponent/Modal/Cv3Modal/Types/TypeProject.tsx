import React from "react";
import handleTypeProject from "../../utils/handleTypeProject";
import Image from "next/image";

type Props = {
  data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
};

const TypeProject = (props: Props) => {
  const { data, checkFocus, handleUpdateData, index, type } = props;
  const {
    itemFocus,
    setItemFocus,
    handleChange,
    handleCheckBtn,
    handleDelete,
    handleMoveItem,
    handleTime,
    handleUpdateTimeEnd,
    handleUpdateTimeStart,
  } = handleTypeProject(props);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="uppercase text-base text-center w-full font-semibold p-2 border-2 border-black">
        dự án
      </div>
      {data?.moreCvProjects.map((dt: any, i: any) => {
        return (
          <div className=" relative">
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
          </div>
        );
      })}
    </div>
  );
};

export default TypeProject;
