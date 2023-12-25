"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import themeApi from "../../api/theme/themeApi";
import postsApi from "../../api/posts/postsApi";
import { useSrollContext } from "@/context/AppProvider";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import Link from "next/link";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import ModalLogin from "@/components/ModalLogin/ModalLogin";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import ShortText from "@/util/ShortText";

type Props = {};

interface IPostTopic {
  success: boolean;
  data: any;
}

interface IBookmark {
  code: number;
  message: string;
}

const Page = (props: Props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();

  const { handleLoadHrefPage } = useSrollContext();
  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handlePrev,
    handleClickDown,
    checkClick,
    setCheckClick,
    handleUpData,
  } = useSwiperAutoSlider();
  const [theme, setTheme] = useState<any>([]);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const [listJob, setListJob] = useState<any[]>([]);
  const [themeId, setThemeId] = useState<number>(120);
  const accountId = localStorage.getItem("accountId");
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [loadingUi, setLoadingUi] = useState<boolean>(false);

  useEffect(() => {
    handleLoadHrefPage();
    const fetchData = async () => {
      try {
        const reponse = (await themeApi.getThemesEnable("vi")) as any;
        if (reponse && reponse?.code === 200) {
          setTheme(reponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    handleUpData();
  }, [listJob]);

  const fetchData = async () => {
    const res = (await postsApi.getPostByThemeId(
      Number(themeId),
      14,
      thresholdNewJob,
      language === 1 ? "vi" : "en"
    )) as unknown as IPostTopic;

    if (res && res.success === true) {
      setListJob(res.data?.posts);
      setLoadingUi(false);
    }
  };

  const handleGetData = (id: number) => {
    setThemeId(id);
  };

  useEffect(() => {
    setLoadingUi(true);
    fetchData();
  }, [themeId, language]);

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

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
        const res = (await postsApi.getPostByThemeId(
          Number(themeId),
          14,
          thresholdNewJob,
          language === 1 ? "vi" : "en"
        )) as unknown as IPostTopic;

        if (res && res.success === true) {
          setListJob([...listJob, ...res.data?.posts]);
          setThresholdNewJob(listJob[listJob.length - 1]?.id);

          if (res.data?.posts.length === 0) {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      }, 0);
    }
  };

  return (
    <div className="flex justify-center w-full">
      {loadingUi === true && (
        <div className="fixed top-1/2 left-1/2 transform(-50%, -50%)">
          <CircularProgress />
        </div>
      )}
      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <h1 className="font-bold text-2xl mb-6">
          {language === 1
            ? `Tất cả công việc theo chủ đề`
            : `All work by subject`}
        </h1>

        {loadingUi === false && (
          <>
            <div className="relative" style={{ marginBottom: "30px" }}>
              {checkPrev && (
                <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center left-0 w-12 justify-center z-10">
                  <button
                    className="p-1 border-2 rounded-full transition-all group-hover:p-2"
                    onClick={handlePrev}
                  >
                    <Image
                      className="w-6"
                      src={"/iconleft.svg"}
                      alt="left"
                      width={200}
                      height={200}
                    />
                  </button>
                </div>
              )}

              <ul
                ref={ref_list_slider}
                className={` select-none inline-flex justify-center`}
                onMouseDown={handleClickDown}
              >
                {theme &&
                  theme?.length > 0 &&
                  theme.map((item: any, index: number) => (
                    <li
                      key={index}
                      className="w-[160px] h-[160px] bg-red-500 rounded-lg flex flex-col items-center justify-center item-company overflow-hidden mx-2 "
                      onClick={() => {
                        if (checkClick) {
                          handleGetData(item.id);
                        } else {
                          setCheckClick(true);
                        }
                      }}
                    >
                      <Image
                        src={item.image}
                        className="pointer-events-none w-full h-full"
                        width={160}
                        height={160}
                        alt="Kinh doanh"
                      />
                      <h2 className="font-bold absolute bottom-8 text-white">
                        {item.title}
                      </h2>
                      <p className="font-bold absolute bottom-3 text-white">
                        {item.number_of_posts} việc làm
                      </p>
                    </li>
                  ))}
              </ul>
              {checkNext && (
                <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center right-0 w-12 justify-center z-10">
                  <button
                    className="p-1 border-2 group-hover:p-2 transition-all rounded-full"
                    onClick={handleNext}
                  >
                    <Image
                      className="w-6"
                      src={"/iconright.svg"}
                      alt="right"
                      width={200}
                      height={200}
                    />
                  </button>
                </div>
              )}
            </div>

            <InfiniteScroll
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              dataLength={listJob.length}
              next={loadMore}
              hasMore={true}
              loader={<></>}
            >
              {listJob &&
                listJob.length > 0 &&
                listJob.map((item, index) => (
                  <ul
                    className="inline-flex flex-wrap justify-center list-job"
                    key={index}
                  >
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
                              <p className="text-[9px]">{item?.district}</p>
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
                              {item?.job_type.job_type_name}
                            </h3>
                          </div>
                        </div>

                        <div className="w-1/12 flex justify-center h-full">
                          <div
                            className="h-fit"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                item.bookmarked === false ||
                                !item.bookmarked
                              ) {
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
                  </ul>
                ))}
            </InfiniteScroll>
          </>
        )}
      </div>

      <ToastContainer />
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={handleToggleModal}
      />
    </div>
  );
};

export default Page;
