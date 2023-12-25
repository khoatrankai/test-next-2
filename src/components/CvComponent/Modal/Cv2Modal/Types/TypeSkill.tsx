import React, { useEffect, useState } from "react";

type Props = {
  data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
};

const TypeSkill = (props: Props) => {
  const { data, handleUpdateData, index, type, checkFocus } = props;

  const handleChange = (e: any, i: number) => {
    let newData = JSON.parse(JSON.stringify(data.moreCvExtraInformations));
    newData[i] = { ...newData[i], [e.target.name]: e.target.value };
    const dataReq = { ...data, moreCvExtraInformations: newData };
    handleUpdateData(dataReq, type, index);
  };
  return (
    <>
      <h2 className="  text-lg font-bold">CÁC KỸ NĂNG</h2>
      <ul className="w-full px-[5px] flex flex-col gap-y-1">
        {data?.moreCvExtraInformations?.map((dt: any, index: any) => {
          return (
            <li className="flex flex-col gap-1 w-full">
              <input
                defaultValue={dt.company}
                name="company"
                onChange={(e: any) => {
                  handleChange(e, index);
                }}
                className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed  ${
                  type === 0
                    ? "hover:border-white/30 "
                    : "hover:border-black/30 "
                }`}
                placeholder="Tên kỹ năng"
              />
              <input
                defaultValue={dt.description}
                name="description"
                onChange={(e: any) => {
                  handleChange(e, index);
                }}
                className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed  ${
                  type === 0
                    ? "hover:border-white/30 "
                    : "hover:border-black/30 "
                }`}
                placeholder="Mô tả"
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TypeSkill;
