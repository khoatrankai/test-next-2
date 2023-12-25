"use client";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import nearByApi from "@/api/nearby/nearbyApi";
import { useSelector } from "react-redux";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import ShortText from "@/util/ShortText";

type Props = {};

interface IBookmark {
  code: number;
  message: string;
}

interface ISuggestJob {
  success: boolean;
  data: any;
}

const Page = () => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const [listJob, setListJob] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const accountId = localStorage.getItem("accountId");
  const profile = useSelector((state: any) => state.profile.profile);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [loadingUi, setLoadingUi] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await nearByApi.getNearByJob(
        profile &&
          profile?.profileLocations?.length > 0 &&
          profile?.profileLocations?.map((item: any) => {
            return item.province.id;
          }),
        null,
        null,
        17,
        thresholdNewJob,
        language === 1 ? "vi" : "en"
      )) as unknown as ISuggestJob;

      if (res && res.success) {
        setListJob(res.data.posts);
        setLoadingUi(false);
      }
    };
    fetchData();
  }, [language]);

  useEffect(() => {
    setLoadingUi(true);
  }, [language]);

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

          setListJob((prevList) =>
            prevList.map((item) =>
              item.id === id ? { ...item, bookmarked: true } : item
            )
          );
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

          setListJob((prevList) =>
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
        const res = (await nearByApi.getNearByJob(
          profile &&
            profile?.profileLocations?.length > 0 &&
            profile?.profileLocations?.map((item: any) => {
              return item.province.id;
            }),
          null,
          null,
          17,
          thresholdNewJob,
          language === 1 ? "vi" : "en"
        )) as unknown as ISuggestJob;

        if (res && res.success === true) {
          setListJob([...listJob, ...res.data.posts]);
          setThresholdNewJob(listJob[listJob.length - 1]?.id);

          if (res.data?.length === 0) {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      }, 0);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <h1 className="font-bold text-2xl mb-3 px-4">
          {language === 1 ? `Tất cả công việc gợi ý` : `All suggested work`}
        </h1>

        {loadingUi === true ? (
          <div className="fixed top-1/2 left-1/2 transform(-50%, -50%)">
            <CircularProgress />
          </div>
        ) : (
          <div>
            <InfiniteScroll
              style={{ display: "flex", flexWrap: "wrap" }}
              dataLength={listJob.length}
              next={loadMore}
              hasMore={true}
              loader={<></>}
            >
              <ul className="inline-flex flex-wrap justify-center list-job">
                {listJob &&
                  listJob.length > 0 &&
                  listJob.map((item, index) => (
                    <li key={index} className="relative p-2">
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
                                {item.company_name}
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
                              <p className="text-[9px]">
                                {item?.district_name}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Image
                                className="w-4 mr-1"
                                src={"/iconlocation.svg"}
                                alt="anh"
                                width={200}
                                height={200}
                              />
                              <p className="text-[9px]">
                                {item.created_at_text}
                              </p>
                            </div>
                          </div>
                          <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold ">
                            <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                              {handleShortValueNumber(item.salary_min)} -{" "}
                              {handleShortValueNumber(item.salary_max)}{" "}
                              {item.money_type_text}
                            </h3>
                            <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                              {item?.job_type?.job_type_name}
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
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
