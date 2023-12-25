import React from "react";
import handleType from "../../utils/handleType";
import Image from "next/image";

type Props = {
  data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
};

const TypeHobby = (props: Props) => {
  const { data, checkFocus, handleUpdateData, index, type } = props;
  const {
    handleChange,
    handleCheckBtn,
    handleDelete,
    handleMoveItem,
    itemFocus,
    setItemFocus,
    handleTime,
    handleUpdateTimeEnd,
    handleUpdateTimeStart,
  } = handleType(props);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="uppercase text-base text-center w-full font-semibold p-2 border-2 border-black">
        sở thích
      </div>
      {data?.moreCvExtraInformations.map((dt: any, i: any) => {
        return (
          <div className="relative">
            <div
              className={`flex flex-col gap-1 w-full p-1 border-[1px]  hover:border-dashed ${
                itemFocus === i && checkFocus ? "" : " border-transparent"
              }
                ${
                  type === 0
                    ? "focus-within:border-white hover:border-white "
                    : "focus-within:border-black hover:border-black "
                }
                `}
              onClick={() => {
                setItemFocus(i);
              }}
            >
              <input
                defaultValue={dt?.description}
                onChange={(e: any) => {
                  handleChange(e, i);
                }}
                className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
                  type === 0
                    ? "hover:border-white/30 "
                    : "hover:border-black/30 "
                }`}
                placeholder="Tên giải thưởng"
                name="description"
              />
            </div>
            <div
              className={`absolute -top-8 flex  gap-x-1 -right-1 ${
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

export default TypeHobby;
