import React, { useEffect, useState } from "react";
import Image from "next/image";
type Props = {
  data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
};

const TypeSkill = (props: Props) => {
  const { data, handleUpdateData, index, type, checkFocus } = props;
  const [itemFocus, setItemFocus] = useState<any>(-1);
  const handleChange = (e: any, i: number) => {
    let newData = JSON.parse(JSON.stringify(data.moreCvExtraInformations));
    newData[i] = { ...newData[i], [e.target.name]: e.target.value };
    const dataReq = { ...data, moreCvExtraInformations: newData };
    handleUpdateData(dataReq, type, index);
  };
  const handleMoveItem = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    const dt = newData?.moreCvExtraInformations.splice(i, 1);
    switch (e) {
      case "up":
        newData?.moreCvExtraInformations.splice(i - 1, 0, dt?.[0]);
        setItemFocus(i - 1);
        break;

      case "down":
        newData?.moreCvExtraInformations.splice(i + 1, 0, dt?.[0]);
        setItemFocus(i + 1);

        break;
    }
    handleUpdateData(newData, type, index);
  };
  const handleCheckBtn = (name: any, i: any) => {
    const dt = JSON.parse(JSON.stringify(data?.moreCvExtraInformations));
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
  const handleDelete = (i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    newData?.moreCvExtraInformations.splice(i, 1);
    handleUpdateData(newData, type, index);
  };
  return (
    <>
      <h2 className=" text-lg font-bold mb-4">GIẢI THƯỞNG</h2>
      <ul className="w-full px-[5px] flex flex-col gap-y-2">
        {data?.moreCvExtraInformations.map((dt: any, i: any) => {
          return (
            <li className="relative">
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
                  defaultValue={dt?.time}
                  onChange={(e: any) => {
                    handleChange(e, i);
                  }}
                  className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
                    type === 0
                      ? "hover:border-white/30 "
                      : "hover:border-black/30 "
                  }`}
                  placeholder="Thời gian"
                  name="time"
                />
                <input
                  defaultValue={dt?.description}
                  onChange={(e: any) => {
                    handleChange(e, i);
                  }}
                  className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
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
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TypeSkill;
