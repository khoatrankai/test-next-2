/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import axiosClient from "@/configs/axiosClient";
import { useSelector } from "react-redux";

type Props = {
  dataReq: any;
  setDataReq: any;
};
interface ILocation {
  code: number;
  data: any;
}
const Salary = (props: Props) => {
  const btn_type = useRef<any>();
  const [dataType, setDataType] = useState<any>([]);
  const [tabType, setTabType] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const handleUpdate = (e: any, value: any = null) => {
    if (value) {
      props.setDataReq({ ...props.dataReq, [e.target.name]: value });
    } else {
      props.setDataReq({
        ...props.dataReq,
        [e.target.name]: Number(e.target.value),
      });
    }
  };
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabType && !btn_type.current.contains(e.target)) {
        setTabType(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabType]);
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        `https://web-service-tk.onrender.com/api/v1/salary-types?lang=${
          languageRedux === 1 ? "vi" : "en"
        }`
      )) as unknown as ILocation;
      if (res && res.code === 200) {
        setDataType(res.data);
      }
    };
    fetchData();
  }, [languageRedux]);
  return (
    <div className="w-full max-w-[460px] relative">
      <label className="text-xs text-yellow-400 absolute font-semibold -top-3 px-1 left-2 bg-white">
        {languageRedux === 1 ? "Mức lương" : "Salary"}
      </label>
      <div className="w-full border-2 rounded-md p-2 flex-wrap focus-within:border-yellow-400 flex gap-2 items-center">
        <div
          className="flex items-center flex-1 min-w-fit justify-between relative  gap-1 p-1 h-full rounded-md border-2 text-sm"
          ref={btn_type}
          onClick={() => {
            setTabType(!tabType);
          }}
        >
          <h2>{dataType[props.dataReq.salaryType - 1]?.value}</h2>
          <Image
            alt=""
            src={"/iconleft.svg"}
            height={200}
            width={200}
            className="w-4"
          />
          {tabType && (
            <div className="absolute w-28 top-[2.5rem] left-0 h-fit py-2 bg-white rounded-md shadow-[-10px_8px_40px_6px_#00000024] z-20">
              <ul className="flex flex-col text-sm">
                {dataType.map((dt: any, index: number) => {
                  return (
                    <li key={index}>
                      <button
                        className="p-2 hover:bg-black/5 cursor-pointer w-full text-start"
                        name="salaryType"
                        onClick={(e: any) => {
                          handleUpdate(e, dt.id);
                        }}
                      >
                        {dt.value}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-sm items-center ">
          <input
            name="salaryMin"
            defaultValue={props?.dataReq?.salaryMin}
            className="p-2 rounded-lg outline-none border-dashed border-2 bg-transparent focus-within:bg-white border-black/20 focus-within:border-black/60 w-[120px]"
            type="number"
            placeholder={languageRedux === 1 ? "Tối thiểu" : "Minimum"}
            onChange={handleUpdate}
          />
          <input
            name="salaryMax"
            defaultValue={props?.dataReq?.salaryMax}
            className="p-2 rounded-lg outline-none border-dashed border-2 bg-transparent focus-within:bg-white border-black/20 focus-within:border-black/60 w-[120px]"
            type="number"
            placeholder={languageRedux === 1 ? "Tối đa" : "Maximum"}
            onChange={handleUpdate}
          />

          <div className="h-full">
            <select
              name="moneyType"
              value={props?.dataReq?.moneyType}
              className="bg-transparent outline-none"
              onChange={handleUpdate}
            >
              <option value={1}>VNĐ</option>
              <option value={2}>USD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
