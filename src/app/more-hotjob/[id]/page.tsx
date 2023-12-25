/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import hotJobApi from "@/api/hotjob/hotJobApi";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import {
  FilterIcon,
  LightFilterIcon,
  SaveIconFill,
  SaveIconOutline,
} from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Select, SelectProps, Space } from "antd";
import locationApi from "@/api/location/locationApi";
import "./page.scss";
import ModalLogin from "@/components/ModalLogin/ModalLogin";
import { useSelector } from "react-redux";
import { useSrollContext } from "@/context/AppProvider";
import ShortText from "@/util/ShortText";
type Props = {};

interface IHotJob {
  is_over: boolean;
  total: number;
  data: any;
  status: number;
}

interface IBookmark {
  code: number;
  message: string;
}

const page = (props: Props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [listHotJob, setListHotJob] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const accountId = localStorage.getItem("accountId");
  const [bookmarked, setBookmarked] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [idFilterProvinces, setIdFilterProvinces] = React.useState("");
  const { handleLoadHrefPage } = useSrollContext();
  const [provincesData, setProvincesData] = React.useState<
    [
      {
        id: string;
        name: string;
        name_en: string;
        full_name: string;
        full_name_en: string;
        code_name: string;
        administrative_unit_id: number;
        administrative_region_id: number;
      }
    ]
  >();
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [optionsProvinces, setOptionsProvinces] = React.useState<
    SelectProps["options"]
  >([]);
  const language = useSelector((state: any) => state.changeLaguage.language);

  // useParams
  const { id } = useParams();

  useEffect(() => {
    handleLoadHrefPage();
    const url = `https://web-service-tkv2.onrender.com/api/v3/posts/topic/${id}?a=394,370`;
    const fetchData = async () => {
      const res = (await hotJobApi.getHotJobById(
        url,
        pageNumber,
        18,
        language === 1 ? "vi" : "en",
        idFilterProvinces ? idFilterProvinces : null
      )) as unknown as IHotJob;

      setTotal(res.total);

      if (res && res.status === 200) {
        setListHotJob(res.data);
      }
    };

    fetchData();
  }, [bookmarked, idFilterProvinces, language]);

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success("Save post success", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setListHotJob((prevList) =>
            prevList.map((item) =>
              item.id === id ? { ...item, bookmarked: true } : item
            )
          );
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error("You cannot bookmark your own post", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  const handleDeleteBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.deleteBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success("Unsave post success", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setListHotJob((prevList) =>
            prevList.map((item) =>
              item.id === id ? { ...item, bookmarked: false } : item
            )
          );
        }
      };

      fetchData();
    } catch (error) {
      toast.error("You cannot delete your own post", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const loadMore = async () => {
    if (!loading && hasMoreData) {
      setLoading(true);

      setTimeout(async () => {
        const url = `https://web-service-tkv2.onrender.com/api/v3/posts/topic/${id}?a=394,370`;

        const res = (await hotJobApi.getHotJobById(
          url,
          pageNumber,
          18,
          "vi",
          null
        )) as unknown as IHotJob;

        if (res && res.status === 200) {
          setListHotJob([...listHotJob, ...res.data]);
          setPageNumber(pageNumber + 1);

          if (res.data?.length === 0) {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      }, 0);
    }
  };

  const handleClickFilterJob = () => {};

  const handleChangeFilterJob = (value: string) => {
    setIdFilterProvinces(value);
  };

  React.useEffect(() => {
    if (provincesData) {
      const newOptionsProvinces = provincesData.map((provinces: any) => {
        return {
          value: provinces.id,
          label: language === 1 ? provinces.full_name : provinces.full_name_en,
        };
      });
      setOptionsProvinces(newOptionsProvinces);
    }
  }, [provincesData]);

  const getProvinces = async () => {
    try {
      const result = await locationApi.getAllProvinces(
        language === 1 ? "vi" : "en"
      );

      if (result) {
        setProvincesData(result.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProvinces();
  }, [language]);

  return (
    <div className="flex justify-center w-full">
      <div className="py-10 max-w-6xl w-full">
        <div className="flex flex-wrap justify-between items-center">
          <h1 className="font-bold text-2xl mb-3">
            {language === 1
              ? `Tìm thấy ${total} công việc nổi bật`
              : `Found ${total} featured jobs`}{" "}
          </h1>

          <div className="filter-hotjob mb-5" onClick={handleClickFilterJob}>
            <div className="filter-provinces">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Select
                  size={"large"}
                  onChange={handleChangeFilterJob}
                  style={{ width: "220px" }}
                  options={optionsProvinces}
                  suffixIcon={
                    idFilterProvinces ? (
                      <LightFilterIcon width={20} height={20} />
                    ) : (
                      <FilterIcon width={20} height={20} />
                    )
                  }
                  placeholder={
                    language === 1 ? `Lọc theo khu vực` : `Filter by region`
                  }
                />
              </Space>
            </div>
          </div>
        </div>

        <div>
          <InfiniteScroll
            style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
            dataLength={listHotJob.length}
            next={loadMore}
            hasMore={true}
            loader={<></>}
          >
            <ul className="inline-flex flex-wrap justify-center list-job">
              {listHotJob &&
                listHotJob.length > 0 &&
                listHotJob.map((item, index) => (
                  <li key={index} className="relative">
                    <Link
                      href={`/post-detail/${item.id}`}
                      className="w-[360px] h-[220px]  bg-gray-300/40 rounded-md px-4 py-6 flex justify-between items-center item-job"
                    >
                      <div className="w-2/12 rounded-sm overflow-hidden">
                        <Image
                          className="w-16 h-16 object-cover"
                          src={item.image ? item.image : "/logo/logo.png"}
                          alt="anh"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="w-7/12 h-full flex flex-col justify-between capitalize">
                        <h2 className="text-sm font-bold  drop-shadow-xl">
                          {handleShortTextHome(item.title, 40)}
                        </h2>
                        <div className="my-2 flex flex-col gap-y-1 font-medium">
                          <div className="flex items-start">
                            <Image
                              className="w-4 mr-1"
                              src={"/iconcompany.svg"}
                              alt="anh"
                              width={200}
                              height={200}
                            />
                            <p className="text-[9px]  drop-shadow-xl">
                              {item.companyName}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <Image
                              className="w-4 mr-1"
                              src={"/icontime.svg"}
                              alt="anh"
                              width={200}
                              height={200}
                            />
                            <p className="text-[9px]">{item?.address}</p>
                          </div>
                          <div className="flex items-center">
                            <Image
                              className="w-4 mr-1"
                              src={"/iconlocation.svg"}
                              alt="anh"
                              width={200}
                              height={200}
                            />
                            <p className="text-[9px]">{item.createdAtText}</p>
                          </div>
                        </div>
                        <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold ">
                          <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                            {handleShortValueNumber(item.salaryMin)} -{" "}
                            {handleShortValueNumber(item.salaryMax)}{" "}
                            {item.moneyType}
                          </h3>
                          <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                            {item?.jobType?.name}
                          </h3>
                        </div>
                      </div>

                      <div className="w-1/12 flex justify-center h-full">
                        <div
                          className="h-fit"
                          onClick={(e) => {
                            e.preventDefault();
                            if (item.bookmarked === false) {
                              handleBookmarked(item.id);
                            } else {
                              handleDeleteBookmarked(item.id);
                            }
                          }}
                        >
                          {item.accountId !== accountId &&
                            (item.bookmarked === true ? (
                              <SaveIconFill width={24} height={24} />
                            ) : (
                              <SaveIconOutline width={24} height={24} />
                            ))}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
      <ToastContainer />
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={handleToggleModal}
      />
    </div>
  );
};

export default page;
