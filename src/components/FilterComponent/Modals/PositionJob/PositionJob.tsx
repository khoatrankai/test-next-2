import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SwiperText from "@/util/SwiperText";
import axios from "axios";
import axiosClient from "@/configs/axiosClient";
import locationApi from "@/api/location/locationApi";
import { RootState } from "@/redux";
import { useSelector } from "react-redux";
import { AddressFilterIcon } from "@/icons";

type Props = {
  checkSizeMin: any;
  dataRequest: any;
  setDataRequest: any;
};
interface IData {
  code: any;
  data: any;
}
const PositionJob = (props: Props) => {
  const ref_position = useRef<any>();
  const { dataRequest, setDataRequest } = props;
  const [dataPosition, setDataPosition] = useState<any>([]);
  const [positionLocation, setPostionLocation] = useState<number>(-1);
  const [tabPosition, setTabPosition] = useState<boolean>(false);
  const dataRequestObj = JSON.parse(
    localStorage.getItem("dataRequest") || "{}"
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const { ref_location, maxItem, countList, handleResize, checkMax } =
    SwiperText();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await locationApi.getAllLocation(
        languageRedux === 1 ? "vi" : "en"
      )) as unknown as IData;
      if (res?.code === 200 && res?.data) {
        setDataPosition(res.data);
      }
    };
    fetchData();
  }, [languageRedux]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (
        !ref_position.current.contains(e.target) &&
        e.target.parentElement?.name !== "btn_close_filter"
      ) {
        setTabPosition(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabPosition]);
  useEffect(() => {
    handleResize();
  }, [dataPosition, dataRequest]);
  const handleUpdate = (id: number) => {
    const data = dataRequest?.district_ids?.filter((dt: any) => {
      return dt === id;
    });
    if (data?.length > 0) {
      setDataRequest({
        ...dataRequest,
        district_ids: dataRequest?.district_ids?.filter((dt: any) => {
          return dt !== id;
        }),
      });
    } else {
      if (dataRequest?.district_ids) {
        setDataRequest({
          ...dataRequest,
          district_ids: [...dataRequest.district_ids, id],
        });
      } else {
        setDataRequest({
          ...dataRequest,
          district_ids: [id],
        });
      }
    }
  };
  const handleCheckTick = (id: number) => {
    const data = dataRequest?.district_ids?.filter((dt: any) => {
      return dt === id;
    });
    if (data?.length > 0) {
      return true;
    }
    return false;
  };
  const handleChangeLocation = (value: any) => {
    setPostionLocation(value);
  };
  const handleCheckName = (id: any) => {
    let name = "";
    dataPosition.map((dt: any) => {
      dt.districts.map((dtt: any) => {
        if (dtt.district_id === id.toString()) {
          name = dtt.district;
          return;
        }
      });
    });
    return name;
  };

  const renderDistrictItems = (district_ids: any, countList: any) => {
    return district_ids?.map((dt: any, index: any) => (
      <li
        key={index}
        className={`px-2 min-w-fit whitespace-nowrap items-center py-1.5 bg-gray-200 rounded-xl item-location flex ${
          index <= countList ? "" : "invisible absolute"
        }`}
      >
        <h2 className="mr-1 text-sm">{handleCheckName(dt)}</h2>
        <button
          name="btn_close_filter"
          className="min-w-fit min-h-fit"
          onClick={(e: any) => {
            e.stopPropagation();
            handleUpdate(dt);
          }}
        >
          <Image
            className="w-2"
            src={"/iconclose.svg"}
            alt=""
            width={200}
            height={200}
          />
        </button>
      </li>
    ));
  };

  useEffect(() => {
    setDataRequest({
      ...dataRequest,
      district_ids: dataRequestObj.district_ids,
    });
  }, []);

  return (
    <div
      className={`items-center flex border-black/30 border-[1px] p-1.5 h-12 rounded-2xl justify-between relative ${
        props.checkSizeMin ? "w-full" : "w-[32%] min-w-[302px]"
      }`}
      onClick={() => {
        setTabPosition(!tabPosition);
      }}
      ref={ref_position}
    >
      <div
        className="w-6 mx-2"
      >
        <AddressFilterIcon/>
      </div>
      <div className="flex-1 overflow-hidden h-full flex items-center">
        {(!dataRequest?.district_ids ||
          dataRequest?.district_ids.length === 0) && (
          <h2>{languageRedux === 1 ? "Vị trí" : "Location"}</h2>
        )}

        <ul
          className="flex gap-x-2 h-full min-w-fit items-center"
          ref={ref_location}
        >
          {dataRequest.district_ids?.length > 0 &&
            renderDistrictItems(dataRequest.district_ids, countList)}

          {checkMax && (
            <li className="flex min-w-[50px] py-1.5  items-center justify-center bg-gray-200 rounded-xl">
              <h2 className="mr-1 text-sm">+{maxItem - countList}...</h2>
            </li>
          )}
        </ul>
      </div>
      <button
        onClick={() => {
          setTabPosition(!tabPosition);
        }}
      >
        <Image
          className={`w-5 transition-transform duration-300 ${
            tabPosition && "-rotate-90"
          }`}
          src={"/iconleft.svg"}
          alt=""
          width={200}
          height={200}
        />
      </button>
      <div
        className={`absolute right-0 left-0 z-30 py-4 rounded-md bg-slate-100 border-2 transition-transform duration-300 top-12 ${
          tabPosition ? "" : "invisible -translate-y-2 opacity-0"
        }`}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <button
          className={`group ml-2 mb-2 flex items-center hover:ml-[0.45rem] ${
            positionLocation != -1 ? "" : "hidden"
          }`}
          onClick={() => {
            handleChangeLocation(-1);
          }}
        >
          <Image
            className="w-5 "
            alt=""
            width={200}
            height={200}
            src={"/iconleft.svg"}
          />
          <h2 className="group-hover:font-medium">
            {languageRedux === 1 ? "Back" : "Quay lại"}
          </h2>
        </button>

        <h1
          className={`ml-2 mb-2 font-bold  ${
            positionLocation != -1 ? "hidden" : ""
          }`}
        >
          {languageRedux === 1 ? "Choose location" : "Chọn vị trí"}
        </h1>

        <ul
          className={`w-full h-80 relative ${
            positionLocation === -1 ? "overflow-scroll overflow-x-hidden" : ""
          }`}
        >
          {dataPosition.map((dt: any, index: number) => {
            return (
              <li
                key={dt.province_id}
                className={`px-5 h-10 flex items-center justify-between cursor-pointer group ${
                  positionLocation === -1 ? " hover:bg-slate-200" : ""
                }`}
                onClick={() => {
                  handleChangeLocation(index);
                }}
              >
                <h2 className={`${positionLocation === -1 ? "" : "hidden"}`}>
                  {dt.province_name}
                </h2>
                <Image
                  className={`w-4 group-hover:-mr-[2px] ${
                    positionLocation === -1 ? "" : "hidden"
                  }`}
                  alt=""
                  width={200}
                  height={200}
                  src={"/iconright.svg"}
                />
                <ul
                  className={`absolute overflow-y-scroll inset-y-0 w-full top-0 bg-slate-100 right-0 transition-all cursor-default ${
                    positionLocation === index
                      ? "opacity-1 right-0"
                      : "opacity-0 right-[-100%] invisible"
                  }`}
                >
                  {dt.districts.map((data: any, i: number) => {
                    return (
                      <li
                        key={data.district_id}
                        className="flex h-10 items-center px-4 hover:bg-slate-200 cursor-pointer"
                        onClick={() => {
                          handleUpdate(data.district_id);
                        }}
                      >
                        <input
                          checked={handleCheckTick(data.district_id)}
                          className="mr-2 cursor-pointer"
                          type="checkbox"
                          onChange={() => {
                            handleUpdate(data.district_id);
                          }}
                        />
                        <label>
                          <span className="cursor-pointer">
                            {data.district}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PositionJob;
