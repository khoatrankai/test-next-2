import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axiosClient from "@/configs/axiosClient";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
type Props = {
  rsJob: any;
  dataRequest: any;
  setDataRequest: any;
};
interface IData {
  code: any;
  data: any;
}
const PositionProfile = (props: Props) => {
  const { rsJob, dataRequest, setDataRequest } = props;
  const ref_tab_location = useRef<any>();
  const [dataLocation, setDataLocation] = useState<any>([]);
  const [tabLocation, setTabLocation] = useState<boolean>(false);
  const [positionLocation, setPostionLocation] = useState<any>(-1);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleUpdatePosition = (index: number) => {
    if (index === positionLocation) {
      setPostionLocation(-1);
    } else {
      setPostionLocation(index);
    }
  };
  const handleUpdate = (id: any) => {
    const data = dataRequest?.locationIds?.filter((dt: any) => {
      return dt === id;
    });
    if (data?.length > 0) {
      setDataRequest({
        ...dataRequest,
        locationIds: dataRequest?.locationIds.filter((dt: any) => {
          return dt !== id;
        }),
      });
    } else {
      if (dataRequest?.locationIds?.length > 0) {
        setDataRequest({
          ...dataRequest,
          locationIds: [...dataRequest?.locationIds, id],
        });
      } else {
        setDataRequest({
          ...dataRequest,
          locationIds: [id],
        });
      }
    }
  };
  useEffect(() => {
    if (rsJob && tabLocation) {
      const handleBlurTab = (e: any) => {
        if (!ref_tab_location.current.contains(e.target)) {
          setTabLocation(false);
        }
      };
      document.addEventListener("click", handleBlurTab);
      return () => {
        document.removeEventListener("click", handleBlurTab);
      };
    }
  }, [rsJob, tabLocation]);
  const handleCheck = (id: any) => {
    const data = dataRequest?.locationIds?.filter((dt: any) => {
      return dt === id;
    });
    if (data?.length > 0) {
      return true;
    }
    return false;
  };
  const handleCheckName = (id: any) => {
    let name = "";
    dataLocation?.forEach((dt: any) => {
      dt.districts?.forEach((dtt: any) => {
        if (dtt.district_id === id) {
          name = dtt.district;
        }
      });
    });
    return name;
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        `https://web-service-tk.onrender.com/api/v1/locations?lang=${
          languageRedux === 1 ? "vi" : "en"
        }`
      )) as unknown as IData;
      if (res?.code === 200 && res.data) {
        setDataLocation(res.data);
      }
    };
    fetchData();
  }, [languageRedux]);
  return (
    <div className="border-b-2 pb-8 mb-8">
      <div className="flex h-10 items-center mb-2">
        <h1 className="font-bold text-base">
          {languageRedux === 1 ? "Khu vực làm việc" : "Working area"}
        </h1>
      </div>
      <div className="flex">
        <div className="h-fit w-fit  rounded-xl">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {dataRequest?.locationIds?.map((dt: any) => {
              return (
                <li
                  key={dt}
                  className={`flex w-fit items-center p-2 border-[1px] rounded-xl ${
                    rsJob ? "border-dashed border-black/30" : ""
                  }`}
                >
                  <h2 className="mr-1">{handleCheckName(dt)}</h2>
                  {rsJob && (
                    <button
                      onClick={() => {
                        handleUpdate(dt);
                      }}
                    >
                      <Image
                        className="w-3"
                        src={"/iconclose.svg"}
                        alt=""
                        width={200}
                        height={200}
                      />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          {rsJob && (
            <div className="relative">
              <button>
                <Image
                  className="w-6"
                  onClick={() => {
                    setTabLocation(!tabLocation);
                  }}
                  src={"/iconadd.svg"}
                  alt=""
                  width={200}
                  height={200}
                />
              </button>

              <div
                ref={ref_tab_location}
                className={`absolute top-full w-64 z-20  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] transition-all bg-white rounded-md pt-4 flex flex-col overflow-hidden ${
                  tabLocation
                    ? "h-80"
                    : "h-0 opacity-0 -translate-y-10 invisible"
                }`}
              >
                <div className="px-1 text-base font-semibold h-fit relative mb-1">
                  <h2
                    className={`${
                      positionLocation < 0
                        ? ""
                        : "opacity-0 invisible -translate-x-10"
                    }`}
                  >
                    {languageRedux === 1
                      ? "Chọn tỉnh/thành phố"
                      : "Select province/city"}
                  </h2>

                  <button
                    className={`flex items-center group hover:font-bold transition-all absolute top-0 ${
                      positionLocation < 0
                        ? "opacity-0 invisible translate-x-10"
                        : ""
                    }`}
                    onClick={() => {
                      handleUpdatePosition(-1);
                    }}
                  >
                    <Image
                      width={200}
                      height={200}
                      className="w-4 group-hover:-translate-x-[1px]"
                      src={"/iconleft.svg"}
                      alt=""
                    />
                    {languageRedux === 1 ? "Quay lại" : "Back"}
                  </button>
                </div>
                <div className="flex overflow-y-hidden hover:overflow-y-scroll">
                  <ul
                    className={`w-full transition-all ${
                      positionLocation < 0
                        ? ""
                        : "opacity-0 absolute right-full"
                    }`}
                  >
                    {dataLocation?.map((dt: any, index: number) => {
                      return (
                        <li key={index}>
                          <button
                            className="cursor-pointer py-2 px-3 font-medium hover:text-yellow-400 hover:font-bold flex w-full items-center justify-between group"
                            onClick={() => {
                              handleUpdatePosition(index);
                            }}
                          >
                            {dt?.province_name}
                            <Image
                              width={200}
                              height={200}
                              className="w-4 group-hover:translate-x-[1px]"
                              src={"/iconright.svg"}
                              alt=""
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <ul
                    className={`w-full transition-all ${
                      positionLocation < 0 ? "opacity-0 absolute left-full" : ""
                    }`}
                  >
                    {dataLocation[positionLocation]?.districts.map(
                      (dt: any, index: number) => {
                        return (
                          <li
                            key={index}
                            className="cursor-pointer flex items-center py-1 px-3 font-medium hover:text-yellow-400 hover:font-bold"
                            onClick={() => {
                              handleUpdate(dt.district_id);
                            }}
                          >
                            <input
                              checked={handleCheck(dt.district_id)}
                              type="checkbox"
                              onChange={() => {
                                handleUpdate(dt.district_id);
                              }}
                              className="mr-1 cursor-pointer"
                            />
                            <div className="">{dt?.district}</div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionProfile;
