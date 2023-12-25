import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import salaryTypeApi from "@/api/salary-type/salaryTypeApi";
import { RootState } from "@/redux";
import { useSelector } from "react-redux";
import { ClockFilterIcon } from "@/icons";

type Props = {
  checkSizeMin: any;
  dataRequest: any;
  setDataRequest: any;
};
interface IData {
  code: any;
  data: any;
}

const SalaryType = (props: Props) => {
  const ref_salary_type = useRef<any>();
  const { checkSizeMin, dataRequest, setDataRequest } = props;
  const [dataType, setDataType] = useState<any>([]);
  const [tabType, setTabType] = useState<boolean>(false);
  const dataRequestObj = JSON.parse(
    localStorage.getItem("dataRequest") || "{}"
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  useEffect(() => {
    const fetchData = async () => {
      const res = (await salaryTypeApi.getJobType(
        languageRedux === 1 ? "vi" : "en"
      )) as unknown as IData;
      if (res && res.code === 200 && res.data) {
        setDataType(res.data);
      }
    };
    fetchData();
  }, [languageRedux]);
  const handleCheckName = (id: any) => {
    return dataType.filter((dt: any) => {
      return dt.id === id;
    })[0]?.value;
  };
  const handleChangeTypeSalary = (id: any) => {
    setDataRequest({ ...dataRequest, salary_type: id });
  };
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (!ref_salary_type.current.contains(e.target)) {
        setTabType(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabType]);
  return (
    <div
      className={`items-center flex border-black/30 border-[1px] p-1.5 h-12 rounded-2xl justify-between relative ${
        checkSizeMin ? "w-full" : "w-[32%] min-w-[302px]"
      }`}
      ref={ref_salary_type}
      onClick={() => {
        setTabType(!tabType);
      }}
    >
      <div className="flex items-center">
        <div
          className="w-6 mx-2"
        >
          <ClockFilterIcon/>
        </div>
        <h2>
          {(
            dataRequest?.salary_type
              ? dataRequest?.salary_type
              : dataRequestObj?.salary_type
              ? dataRequestObj?.salary_type
              : null
          )
            ? handleCheckName(
                dataRequest?.salary_type
                  ? dataRequest?.salary_type
                  : dataRequestObj?.salary_type
                  ? dataRequestObj?.salary_type
                  : null
              )
            : languageRedux === 1
            ? "Thời gian làm"
            : "Working time"}
        </h2>
      </div>
      <div
        className={`absolute inset-x-0 py-4 rounded-md bg-slate-100 border-2 transition-transform duration-300 top-12 z-10 ${
          tabType ? "" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="w-full h-80">
          {dataType.map((dt: any, index: number) => {
            return (
              <li
                key={dt.id}
                className="flex px-5 h-10 items-center item-filter-checkbox group cursor-pointer hover:bg-gray-300/40"
                onClick={() => {
                  handleChangeTypeSalary(dt.id);
                }}
              >
                <input
                  className="mr-2 group-hover:bg-black"
                  checked={
                    dt.id ===
                    (dataRequest?.salary_type
                      ? dataRequest?.salary_type
                      : dataRequestObj?.salary_type
                      ? dataRequestObj?.salary_type
                      : null)
                  }
                  onChange={() => {
                    handleChangeTypeSalary(dt.id);
                  }}
                  type="radio"
                />
                <label className="group-hover:font-bold group-hover:text-blue-600 cursor-pointer">
                  <span>{dt.value}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <button>
        <Image
          className={`w-5 transition-transform duration-300 ${
            tabType && "-rotate-90"
          }`}
          src={"/iconleft.svg"}
          alt=""
          width={200}
          height={200}
        />
      </button>
    </div>
  );
};

export default SalaryType;
