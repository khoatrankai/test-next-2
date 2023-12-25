/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./TopCompanyComponent.scss";
import themeApi from "@/api/theme/themeApi";
import postsApi from "@/api/posts/postsApi";
import Link from "next/link";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import { ToastContainer, toast } from "react-toastify";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import ModalLogin from "../ModalLogin/ModalLogin";
import ShortText from "@/util/ShortText";
import { useSelector } from "react-redux";

type Props = {};

interface IPostTopic {
  success: boolean;
  data: any;
}

interface IBookmark {
  code: number;
  message: string;
}

const TopCompanyComponent = (props: Props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();

  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handlePrev,
    handleClickDown,
    handleUpData,
    checkClick,
    setCheckClick,
  } = useSwiperAutoSlider(13);
  const [theme, setTheme] = useState<any>([]);
  const [pageNewJob, setPageNewJob] = useState<number>(0);
  const [positionFocus, setPostionFocus] = useState<number>(1);
  const refHoverPosition = useRef<any>();
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const [idPrev, setIdPrev] = useState<number>(0);
  const [listJob, setListJob] = useState<any[]>([]);
  const [themeId, setThemeId] = useState<number>(120);
  const [bookmarked, setBookmarked] = React.useState(false);
  const accountId = localStorage.getItem("accountId");
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const language = useSelector((state: any) => state.changeLaguage.language);

  useEffect(() => {
    handleUpData();
  }, [listJob]);

  useEffect(() => {
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

  const fetchData = async () => {
    const res = (await postsApi.getPostByThemeId(
      Number(themeId),
      11,
      thresholdNewJob,
      language === 1 ? "vi" : "en"
    )) as unknown as IPostTopic;

    if (res && res.success === true) {
      setListJob(res.data?.posts);
    }
  };

  const handleGetData = (id: number) => {
    setThemeId(id);
  };
  useEffect(() => {
    fetchData();
  }, [thresholdNewJob, themeId, bookmarked, language]);

  const handleNextNewJob = () => {
    setIdPrev(listJob[0].id);
    setThresholdNewJob(listJob[listJob.length - 1].id);
    setPageNewJob(pageNewJob + 1);
  };

  const handlePrevNewJob = () => {
    setThresholdNewJob(idPrev + 1);
  };

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            language === 1 ? "Lưu bài viết thành công" : "Save post success",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          setBookmarked(!bookmarked);
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        language === 1
          ? "Bạn không thể đánh dấu bài viết của chính mình"
          : "You cannot bookmark your own post",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleDeleteBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.deleteBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            language === 1
              ? "Bỏ lưu bài đăng thành công"
              : "Unsave post success",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          setBookmarked(!bookmarked);
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        language === 1
          ? "Bạn không thể xóa bài viết của chính mình"
          : "You cannot delete your own post",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-2xl">
            {language === 1 ? `Công việc chủ đề` : `Subject work`}
          </h1>

          <div className="flex items-center gap-5">
            <Link
              href="/more-topic"
              className="text font-semibold text-red-500 hover:text-red-600 "
            >
              {language === 1 ? `Xem thêm` : `See more`}
            </Link>

            <div className="w-20 flex justify-between">
              <button
                className=" bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group"
                onClick={() => handlePrevNewJob()}
              >
                <Image
                  className="w-5 group-hover:-ml-1"
                  alt="anh"
                  src={"/iconleft.svg"}
                  width={200}
                  height={200}
                />
              </button>
              <button
                className=" bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group ml-2"
                onClick={() => handleNextNewJob()}
              >
                <Image
                  className="w-5 group-hover:-mr-1"
                  alt="anh"
                  src={"/iconright.svg"}
                  width={200}
                  height={200}
                />
              </button>
            </div>
          </div>
        </div>
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
            className={` select-none inline-flex justify-center relative`}
            onMouseDown={handleClickDown}
          >
            {theme &&
              theme?.length > 0 &&
              theme.map((item: any, index: number) => (
                <li
                  key={index}
                  className="w-[220px] h-[200px] rounded-lg flex flex-col items-center justify-center item-company overflow-hidden"
                  onClick={() => {
                    if (checkClick) {
                      handleGetData(item.id);
                      refHoverPosition.current.style.transform = `translateX(${
                        index * 233
                      }px)`;
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
            {theme?.length > 0 && (
              <div
                className={`w-[220px] h-2 rounded-xl bg-yellow-300 left-0 absolute -bottom-4 transition-all duration-500`}
                ref={refHoverPosition}
              ></div>
            )}
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

        <div>
          <ul className="inline-flex flex-wrap justify-center list-job">
            {listJob &&
              listJob.length > 0 &&
              listJob.map((item, index) => (
                <li key={index} className="relative">
                  <Link
                    href={`/post-detail/${item.id}`}
                    className="w-[360px] h-[220px]  bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md px-4 py-6 flex justify-between items-center item-job "
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
                          <p className="text-[9px]">{item.created_at_text}</p>
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
        </div>
        <div className="absolute top-0 right-0 flex items-center">
          <a
            className="mr-4 text font-semibold text-red-500 hover:text-red-600"
            href="#"
          >
            Xem thêm
          </a>
          <div className="w-20 flex justify-between">
            <button
              className=" bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group"
              onClick={() => handlePrevNewJob()}
            >
              <Image
                className="w-5 group-hover:-ml-1"
                alt="anh"
                src={"/iconleft.svg"}
                width={200}
                height={200}
              />
            </button>
            <button
              className=" bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group ml-2"
              onClick={() => handleNextNewJob()}
            >
              <Image
                className="w-5 group-hover:-mr-1"
                alt="anh"
                src={"/iconright.svg"}
                width={200}
                height={200}
              />
            </button>
          </div>
        </div>
      </div>
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={handleToggleModal}
      />
      <ToastContainer />
    </div>
  );
};

export default TopCompanyComponent;
