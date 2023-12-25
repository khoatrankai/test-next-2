"use client";
import axiosClient from "@/configs/axiosClient";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  dataReq: any;
  setDataReq: any;
};
interface ILocation {
  code: number;
  data: any;
}
const TypeJob = (props: Props) => {
  const ref_tab_type = useRef<any>();
  const [dataType, setDataType] = useState<any>([]);
  const [tabType, setTabType] = useState<boolean>(false);
  const [nameType, setNameType] = useState<any>("Chọn loại hình làm việc");
  const { dataReq } = props;
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );

  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabType && !ref_tab_type.current.contains(e.target)) {
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
        `https://web-service-tk.onrender.com/api/v1/job-types?lang=${
          languageRedux === 1 ? "vi" : "en"
        }`
      )) as unknown as ILocation;
      if (res && res.code === 200) {
        setDataType(res.data);
      }
    };
    fetchData();
  }, [languageRedux]);

  const handleUpdate = (id: number, name: string) => {
    setTabType(false);
    setNameType(name);
    props.setDataReq({ ...props.dataReq, jobTypeId: id });
  };

  useEffect(() => {
    if (dataReq.jobTypeId) {
      const data = dataType.filter((dt: any) => {
        return dt.id === dataReq.jobTypeId;
      });
      if (data.length > 0) {
        setNameType(data[0].name);
      }
    }
  }, [dataReq]);

  return (
    <div className="rounded-lg bg-white shadow-[7px_8px_40px_6px_#00000024] p-4">
      <div className="flex h-10 items-center mb-8">
        <div className="h-full w-3 bg-yellow-500 mr-4"></div>
        <h1 className="font-bold text-xl">
          {languageRedux !== 1 ? "Type of work" : "Loại hình làm việc"}
        </h1>
      </div>
      <div className="flex flex-wrap p-2 relative border-2 gap-2 max-w-[400px] w-full rounded-md focus-within:border-yellow-400">
        <label className="mb-1 text-xs text-yellow-400 absolute font-semibold -top-3 px-1 left-2 bg-white">
          {languageRedux !== 1 ? "Type of work" : "Loại hình làm việc"}
        </label>
        <div className="p-1 border-2 w-full rounded-md" ref={ref_tab_type}>
          <button
            className="flex items-center w-full justify-between cursor-pointer"
            onClick={() => {
              setTabType(!tabType);
            }}
          >
            <h2 className="mr-4">{nameType}</h2>
            <div>
              <Image
                className={`w-4 transition-all ${tabType ? "-rotate-90" : ""}`}
                src={"/iconleft.svg"}
                width={200}
                height={200}
                alt=""
              />
            </div>
          </button>
          {tabType && (
            <div className="absolute z-20 top-[4rem] left-0">
              <div className="relative">
                <ul
                  className={`h-50 py-4 w-60 transition-all bg-white/95 shadow-[-2px_20px_20px_10px_#00000024] overflow-y-hidden hover:overflow-y-scroll overflow-x-hidden rounded-lg
                  }`}
                >
                  {dataType.map((dt: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className={`p-2 cursor-pointer hover:text-yellow-400 hover:font-bold ${
                          dt.id === props.dataReq.jobTypeId
                            ? "text-yellow-400 font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          handleUpdate(dt.id, dt.name);
                        }}
                      >
                        <h2>{dt.name}</h2>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeJob;
