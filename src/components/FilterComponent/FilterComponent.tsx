/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./FilterComponent.scss";
import PositionJob from "./Modals/PositionJob/PositionJob";
import CategoryJob from "./Modals/CategoryJob/CategoryJob";
import TypeJob from "./Modals/TypeJob/TypeJob";
import SalaryType from "./Modals/SalaryType/SalaryType";
import { BlackSearchIcon, CalendarFilterIcon, MoneyFilterIcon } from "@/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResult } from "@/redux/reducer/searchReducer";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux";
import searchApi from "@/api/search/apiSearch";

type Props = {
  tabSearchFilter: Boolean;
  setTabFilter: any;
  checkReponsive: any;
  dataRequest: any;
  setDataRequest: any;
};

const FilterComponent = (props: Props) => {
  const { dataRequest, setDataRequest } = props;
  const ref_filter = useRef<any>();
  const ref_tab_salary = useRef<any>();
  const ref_tab_workperiod = useRef<any>();
  const [checkSize, setCheckSize] = useState<boolean>(false);
  const [checkSizeMin, setCheckSizeMin] = useState<boolean>(false);
  const [tabFilterWorkperiod, setTabFilterWorkperiod] =
    useState<boolean>(false);
  const [tabFilterSalary, setTabFilterSalary] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const [dataWorkPeriod, setDataWorkPeriod] = useState<any>([
    { typeWork: "Working on the weekend", name: "is_working_weekend" },
    { typeWork: "Remote work", name: "is_date_period" },
  ]);
  const [dataSuggest, setDataSuggest] = React.useState<any>([]);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const dataRequestObj = JSON.parse(
    localStorage.getItem("dataRequest") || "{}"
  );
  const [tabSuggest, setTabSuggest] = useState<boolean>(false);
  const ref_input = useRef<any>();
  const handleUpdateWorkPeriod = (name: any) => {
    switch (name) {
      case "is_working_weekend":
        if (dataRequest.is_working_weekend > 0) {
          setDataRequest({ ...dataRequest, is_working_weekend: 0 });
        } else {
          setDataRequest({ ...dataRequest, is_working_weekend: 1 });
        }
        break;
      case "is_date_period":
        if (dataRequest.is_date_period > 0) {
          setDataRequest({ ...dataRequest, is_date_period: 0 });
        } else {
          setDataRequest({ ...dataRequest, is_date_period: 1 });
        }
        break;
    }
  };
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabSuggest && !ref_input.current?.contains(e.target)) {
        setTabSuggest(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabSuggest]);
  const handleSearch = (keyword?: string) => {
    if (keyword) {
      setDataRequest({ ...dataRequest, q: keyword });
    }
    localStorage.setItem("dataRequest", JSON.stringify(dataRequest));
    dispatch(
      fetchSearchResult({
        q: keyword ? keyword : dataRequest.q ? dataRequest.q.trim() : null,
        page: page ? page : null,
        moneyType: dataRequest.money_type ? dataRequest.money_type : null,
        isWorkingWeekend: dataRequest.is_working_weekend
          ? dataRequest.is_working_weekend
          : null,
        isDatePeriod: dataRequest.is_date_period
          ? dataRequest.is_date_period
          : null,
        salaryMin: dataRequest.salary_min ? dataRequest.salary_min : 0,
        salaryMax: dataRequest.salary_max ? dataRequest.salary_max : 1000000,
        jobTypeId: dataRequest.jobTypeId ? [dataRequest.jobTypeId] : [],
        categoryIds: dataRequest.category_ids ? dataRequest.category_ids : null,
        districtIds: dataRequest.district_ids ? dataRequest.district_ids : null,
        salaryType: dataRequest.salary_type ? dataRequest.salary_type : null,
        lang: "vi",
      }) as unknown as any
    ).then(() => {
      router.push("/search-result");
    });
  };

  useEffect(() => {
    const handleResizeNav = () => {
      const width = window.innerWidth;
      if (width < 1152) {
        setCheckSize(true);
      } else {
        setCheckSize(false);
      }
      if (width < 655) {
        setCheckSizeMin(true);
      } else {
        setCheckSizeMin(false);
      }
    };
    handleResizeNav();
    window.addEventListener("resize", handleResizeNav);
    return () => {
      window.removeEventListener("resize", handleResizeNav);
    };
  }, []);

  const handleChangeSalary = (e: any) => {
    const name = e.target.name;
    const data = e.target.value;
    const formattedNumber = Number(data.replace(/\D/g, ""));
    setDataRequest({ ...dataRequest, [name]: formattedNumber });
  };

  useEffect(() => {
    setDataRequest({
      ...dataRequest,
      salary_min: dataRequestObj?.salary_min ? dataRequestObj?.salary_min : 0,
    });
    setDataRequest({
      ...dataRequest,
      salary_max: dataRequestObj?.salary_max ? dataRequestObj?.salary_max : 0,
    });
  }, []);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (!ref_tab_salary.current.contains(e.target)) {
        setTabFilterSalary(false);
      }
      if (!ref_tab_workperiod.current.contains(e.target)) {
        setTabFilterWorkperiod(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, []);

  const handleReset = () => {
    localStorage.removeItem("dataRequest");
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await searchApi.getSuggestKeyWord(
        10,
        language === 1 ? "vi" : "en"
      );
      console.log(res);
      setDataSuggest(res && res.data);
    };

    fetchData();
  }, []);

  return (
    <div
      className={`select-none py-8 px-4 absolute top-20 min-h-fit w-full flex flex-col gap-4 items-center transition-all justify-center border-b-2 border-b-black/20 duration-300 bg-white ${
        props.tabSearchFilter ? "" : "-translate-y-10 opacity-0 invisible"
      }`}
      ref={ref_filter}
    >
      {props.checkReponsive && (
        <div className="relative flex flex-1 w-full p-1.5 h-12 max-w-6xl border-black/30  border-[1px] border-opacity-40 rounded-2xl pr-4 focus-within:transition-all focus-within:shadow-gray-300 focus-within:border-opacity-70">
          <button className="p-2">
            <BlackSearchIcon width={24} height={24} />
          </button>
          <input
            value={dataRequest?.q}
            onChange={(e: any) => {
              setDataRequest({ ...dataRequest, q: e.target.value });
            }}
            className="text-xs flex-1 outline-none bg-transparent"
            placeholder={`Từ khóa tìm kiếm`}
            type="text"
            onKeyDown={(e: any) => {
              alert(e.key);
              if (e.key === "Enter") {
                handleSearch();
                setTabSuggest(false);
              }
            }}
            onClick={() => {
              setTabSuggest(true);
            }}
          />
          {tabSuggest && (
            <div
              className="absolute right-0 top-10 bg-white border-2 rounded-md w-full h-fit overflow-hidden z-40"
              ref={ref_input}
            >
              <div className="flex flex-col">
                <div className="text-center text-sm m-2 font-bold">
                  Từ khoá gợi ý
                </div>
                <div className="wrap-items-history wrap-items-search">
                  {dataSuggest?.map((suggest: any, index: number) => (
                    <div className="item-history item-search" key={index}>
                      <span
                        className="item-search_text"
                        onClick={(e) => {
                          handleSearch(suggest.keyword);
                          setTabSuggest(false);
                        }}
                      >
                        {suggest.keyword}
                      </span>
                      {/* <CloseOutlined onClick={handleDeleteKeyword}/> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div
        className={`w-full flex justify-center items-center max-w-6xl gap-4 ${
          checkSize ? "flex-col" : ""
        }`}
      >
        <div
          className={` items-center inline-flex flex-wrap justify-center gap-[2%] gap-y-5 ${
            checkSize ? "w-full" : "w-5/6"
          }`}
        >
          <PositionJob
            checkSizeMin={checkSizeMin}
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
          />
          <CategoryJob
            checkSizeMin={checkSizeMin}
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
          />
          <TypeJob
            checkSizeMin={checkSizeMin}
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
          />
          <SalaryType
            checkSizeMin={checkSizeMin}
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
          />
          <div
            className={`flex border-black/30 border-[1px] p-1.5 h-12 rounded-2xl justify-between relative ${
              checkSizeMin ? "w-full" : "w-[32%] min-w-[302px]"
            }`}
            ref={ref_tab_salary}
            onClick={() => {
              setTabFilterSalary(!tabFilterSalary);
            }}
          >
            <div className="flex items-center">
              <div className="w-6 mx-2">
                <MoneyFilterIcon />
              </div>
              <h2>
                {dataRequest.salary_max <= 0 && dataRequest.salary_min <= 0
                  ? languageRedux === 1
                    ? "Mức lương"
                    : "Salary"
                  : `${
                      dataRequest.salary_min
                        .toLocaleString()
                        .replace(/\./g, ",") +
                      " - " +
                      dataRequest.salary_max
                        .toLocaleString()
                        .replace(/\./g, ",")
                    }`}
              </h2>
            </div>
            <div
              className={`absolute flex flex-col inset-x-0 px-5 pt-5 pb-10 rounded-md bg-slate-100 border-2 transition-transform duration-300 top-12 z-10 ${
                tabFilterSalary ? "" : "invisible -translate-y-2 opacity-0"
              }`}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
            >
              <div className="text-center border-b-2 pb-4">
                <h2 className="font-bold text-lg">
                  {languageRedux === 1 ? "Mức lương" : "Salary"}
                </h2>
              </div>
              <div className="flex justify-between my-2">
                <button
                  className={`basis-1/2 p-4 text-base font-bold rounded-xl hover:bg-black/5 ${
                    dataRequest.money_type === 1 && "text-blue-600"
                  }`}
                  onClick={() => {
                    setDataRequest({ ...dataRequest, money_type: 1 });
                  }}
                >
                  VND
                </button>
                <button
                  className={`basis-1/2 p-4 text-base font-bold rounded-xl hover:bg-black/5 ${
                    dataRequest.money_type === 2 && "text-blue-600"
                  }`}
                  onClick={() => {
                    setDataRequest({ ...dataRequest, money_type: 2 });
                  }}
                >
                  USD
                </button>
              </div>
              <div className="border-2 px-2 my-2 h-10 border-black/10 rounded-lg">
                <input
                  name={"salary_min"}
                  placeholder="min"
                  value={
                    dataRequest.salary_min < 0
                      ? ""
                      : dataRequest.salary_min
                          .toLocaleString()
                          .replace(/\./g, ",")
                  }
                  onChange={handleChangeSalary}
                  className="w-full outline-none no-spinners h-full font-medium"
                  type="tel"
                />
              </div>
              <div className="border-2 px-2 h-10 border-black/10 rounded-lg">
                <input
                  name={"salary_max"}
                  placeholder="max"
                  value={
                    dataRequest.salary_max < 0
                      ? ""
                      : dataRequest.salary_max
                          .toLocaleString()
                          .replace(/\./g, ",")
                  }
                  onChange={handleChangeSalary}
                  className="w-full outline-none no-spinners h-full font-medium"
                  type="tel"
                />
              </div>
            </div>
            <button>
              <Image
                className={`w-5 transition-transform duration-300 ${
                  tabFilterSalary && "-rotate-90"
                }`}
                src={"/iconleft.svg"}
                alt=""
                width={200}
                height={200}
              />
            </button>
          </div>
          <div
            className={`flex border-black/30 border-[1px] p-1.5 h-12 rounded-2xl justify-between relative ${
              checkSizeMin ? "w-full" : "w-[32%] min-w-[302px]"
            }`}
            onClick={() => {
              setTabFilterWorkperiod(!tabFilterWorkperiod);
            }}
            ref={ref_tab_workperiod}
          >
            <div className="flex items-center">
              <div className="w-6 mx-2">
                <CalendarFilterIcon />
              </div>
              <div>
                {dataRequest.is_working_weekend === 0 &&
                  dataRequest.is_date_period === 0 && (
                    <h2 className="text-sm">
                      {languageRedux === 1
                        ? "Hình thức làm việc"
                        : "Work period"}
                    </h2>
                  )}
                <h2 className="text-sm">
                  {dataRequest.is_working_weekend > 0 &&
                    dataWorkPeriod[0].typeWork}
                </h2>
                <h2 className="text-sm">
                  {dataRequest.is_date_period > 0 && dataWorkPeriod[1].typeWork}
                </h2>
              </div>
            </div>
            <div
              className={`absolute flex flex-col inset-x-0 p-5 rounded-md bg-slate-100 border-2 transition-transform duration-300 top-12 z-10 ${
                tabFilterWorkperiod ? "" : "invisible -translate-y-2 opacity-0"
              }`}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
            >
              <div className="px-4 pb-4 text-center border-b-2">
                <h2 className="font-bold text-lg">
                  {languageRedux === 1 ? "Hình thức làm việc" : "Work period"}
                </h2>
              </div>
              <ul className="mt-4">
                {dataWorkPeriod.map((dt: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="h-10 flex items-center cursor-pointer hover:font-bold hover:text-blue-600"
                      onClick={(e) => {
                        handleUpdateWorkPeriod(dt.name);
                      }}
                    >
                      <input
                        checked={dataRequest[dt.name]}
                        onChange={() => {
                          handleUpdateWorkPeriod(dt.name);
                        }}
                        className="cursor-pointer h-4 w-4 mr-2"
                        type="checkbox"
                      />
                      <label className="cursor-pointer">
                        <span>{dt.typeWork}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button>
              <Image
                className={`w-5 transition-transform duration-300 ${
                  tabFilterWorkperiod && "-rotate-90"
                }`}
                src={"/iconleft.svg"}
                alt=""
                width={200}
                height={200}
              />
            </button>
          </div>
        </div>
        <div
          className={`flex gap-5 text-xs font-semibold ${
            checkSize
              ? "w-full  justify-center"
              : "w-1/6 flex-col  justify-between"
          }`}
        >
          <button
            className="py-2 px-4 rounded-xl h-12 w-44 bg-white border-2 text-yellow-500 hover:text-white hover:shadow-[0px_0px_15px_9px_#00000024] hover:bg-yellow-500 border-yellow-500 hover:font-bold"
            onClick={() => {
              handleSearch();
              props.setTabFilter();
            }}
          >
            {languageRedux === 1 ? "Tìm kiếm" : "Search"}
          </button>
          <button
            onClick={handleReset}
            className="py-2 px-4  h-12 rounded-xl w-44 bg-yellow-500 border-2 text-white border-black/20 border-yellow-500 hover:shadow-[0px_0px_15px_9px_#00000024] hover:bg-white hover:text-yellow-500 hover:font-bold"
          >
            {languageRedux === 1 ? "Xóa bộ lọc" : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
