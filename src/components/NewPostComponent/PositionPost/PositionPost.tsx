"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
const PositionPost = (props: Props) => {
  const btn_position = useRef<any>();
  const [dataPosition, setDataPosition] = useState<any>([]);
  const [checkPosition, setCheckPosition] = useState<any>({
    province: -1,
    district: -1,
    ward: -1,
  });
  const [nameWard, setNameWard] = useState<string>("Vị trí");
  const [tabPosition, setTabPosition] = useState<boolean>(false);
  const { dataReq } = props;
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  useEffect(() => {
    setNameWard(languageRedux === 1 ? "Vị trí" : "Position");
  }, [languageRedux]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabPosition && !btn_position.current.contains(e.target)) {
        setTabPosition(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabPosition]);
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        "https://web-service-tk.onrender.com/api/v1/locations"
      )) as unknown as ILocation;
      if (res && res.code === 200) {
        setDataPosition(res.data);
      }
    };
    fetchData();
  }, []);

  const handleUpdatePos = (e: any, index: number, name: string = "Vị trí") => {
    if (index === checkPosition[e]) {
      if (e === "province") {
        setCheckPosition({ province: -1, district: -1, ward: -1 });
      } else if (e === "district") {
        setCheckPosition({ district: -1, ward: -1 });
      } else {
        setCheckPosition({ ...checkPosition, [e]: -1 });
        setNameWard("Vị trí");
      }
    } else {
      if (e === "ward") {
        setTabPosition(!tabPosition);
        setNameWard(name);
        props.setDataReq({ ...props.dataReq, wardId: index });
      }
      if (e === "province") {
        setCheckPosition({ province: index, district: -1, ward: -1 });
      } else setCheckPosition({ ...checkPosition, [e]: index });
    }
  };
  return (
    <div className="rounded-lg bg-white shadow-[7px_8px_40px_6px_#00000024] p-4">
      <div className="flex h-10 items-center mb-8">
        <div className="h-full w-3 bg-yellow-500 mr-4"></div>
        <h1 className="font-bold text-xl">
          {languageRedux === 1 ? "Vị trí" : "Position"}
        </h1>
      </div>
      <div className="flex flex-wrap p-2 relative border-2 gap-2 w-full rounded-md focus-within:border-yellow-400">
        <label className="mb-1 text-xs text-yellow-400 absolute font-semibold -top-3 px-1 left-2 bg-white">
          {languageRedux === 1 ? "Địa chỉ...." : "Enter address..."}
        </label>
        <div className={`flex-1 min-w-[210px]`}>
          <input
            className="outline-none border-2 border-dashed rounded-md bg-transparent focus-within:border-black/40 focus-within:bg-white p-1 w-full"
            placeholder={languageRedux === 1 ? "Địa chỉ" : "Address"}
            type="text"
            defaultValue={dataReq?.address}
            onChange={(e) => {
              props.setDataReq({ ...props.dataReq, address: e.target.value });
            }}
          />
        </div>
        <div className="p-1 border-2 w-fit rounded-md" ref={btn_position}>
          <button
            className="flex items-center justify-between cursor-pointer"
            onClick={() => {
              setTabPosition(!tabPosition);
            }}
          >
            <h2 className="mr-4">{nameWard}</h2>
            <div>
              <Image
                className={`w-4 transition-all ${
                  tabPosition ? "-rotate-90" : ""
                }`}
                src={"/iconleft.svg"}
                width={200}
                height={200}
                alt=""
              />
            </div>
          </button>
          {tabPosition && (
            <div className="absolute z-20 top-full right-0">
              <div className="relative">
                <ul
                  className={`h-80 py-4 w-60 transition-all bg-white overflow-y-hidden border-b-2 hover:overflow-y-scroll overflow-x-hidden ${
                    checkPosition.province >= 0 ? " rounded-l-lg" : "rounded-lg"
                  }`}
                >
                  {dataPosition.map((dt: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className={`p-2 cursor-pointer hover:text-yellow-400 hover:font-bold ${
                          index === checkPosition.province
                            ? "text-yellow-400 font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          handleUpdatePos("province", index);
                        }}
                      >
                        <h2>{dt.province_name}</h2>
                      </li>
                    );
                  })}
                </ul>
                {checkPosition.province >= 0 && (
                  <ul
                    className={`py-4 absolute -top-0 -left-full w-60 bg-white h-80 border-b-2 overflow-y-hidden hover:overflow-y-scroll transition-all ${
                      checkPosition.district >= 0 ? "" : "rounded-r-lg"
                    }`}
                  >
                    {dataPosition[checkPosition.province]?.districts.map(
                      (dt: any, index: number) => {
                        return (
                          <li
                            key={index}
                            className={`p-2 cursor-pointer hover:text-yellow-400  hover:font-bold ${
                              index === checkPosition.district
                                ? "text-yellow-400 font-bold"
                                : ""
                            }`}
                            onClick={() => {
                              handleUpdatePos("district", index);
                            }}
                          >
                            <h2>{dt.district}</h2>
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}
                {checkPosition.district >= 0 && (
                  <ul className="py-4 absolute bg-white -top-0 -left-[200%] w-60 h-80 border-b-2 overflow-y-hidden hover:overflow-y-scroll">
                    {dataPosition[checkPosition.province]?.districts[
                      checkPosition.district
                    ]?.wards.map((dt: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className={`p-2 cursor-pointer hover:text-yellow-400  hover:font-bold ${
                            dt.id === checkPosition.ward
                              ? "text-yellow-400 font-bold"
                              : ""
                          }`}
                          onClick={() => {
                            handleUpdatePos("ward", dt.id, dt.full_name);
                          }}
                        >
                          <h2>{dt.full_name}</h2>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionPost;
